import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;
import 'package:permission_handler/permission_handler.dart';
import 'package:intl/intl.dart';
import 'package:mobile/models/cita.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Inicialización del plugin de notificaciones
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();
final FlutterSecureStorage storage =
    FlutterSecureStorage(); // Para guardar notificaciones vistas

// Inicializar notificaciones
Future<void> initNotifications() async {
  // Inicializar zonas horarias
  tz.initializeTimeZones();

  // Solicitar permisos para notificaciones
  if (await Permission.notification.isDenied) {
    await Permission.notification.request();
  }

  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings(
          'icono_notificacion'); // Icono de notificación

  const DarwinInitializationSettings initializationSettingsIOS =
      DarwinInitializationSettings();

  const InitializationSettings initializationSettings = InitializationSettings(
    android: initializationSettingsAndroid,
    iOS: initializationSettingsIOS,
  );

  await flutterLocalNotificationsPlugin.initialize(initializationSettings);
}

// Programar notificaciones para una lista de citas
Future<void> programarNotificaciones(List<Cita> citas) async {
  DateTime now = DateTime.now();

  for (var cita in citas) {
    String fecha = DateFormat('dd/MM/yyyy').format(cita.fecha);
    String hora = "${cita.horaInicio} - ${cita.horaTermino}";
    String titulo = "Cita ${cita.idCita}";
    // String mensaje = "Fecha: $fecha\nHora: $hora";

    if (cita.fecha.isBefore(now)) {
      // Manejar citas expiradas mostrando una notificación inmediata
      await _mostrarNotificacionInmediata(cita.idCita, "$titulo - Expirada",
          "La cita programada para el $fecha a las $hora ha expirado.");
    } else {
      // Comprobar si la notificación ya fue vista
      bool notificacionVista = await _notificacionYaVista(cita.idCita);

      if (!notificacionVista) {
        // Programar notificaciones a intervalos específicos antes de la cita
        await _programarNotificacionEnIntervalo(
            cita, Duration(days: 7), "Falta 1 semana para tu cita");
        await _programarNotificacionEnIntervalo(
            cita, Duration(days: 3), "Faltan 3 días para tu cita");
        await _programarNotificacionEnIntervalo(
            cita, Duration(days: 0), "Hoy es el día de tu cita");
      }
    }
  }
}

// Función auxiliar para programar notificaciones en intervalos
Future<void> _programarNotificacionEnIntervalo(
    Cita cita, Duration intervalo, String mensajePersonalizado) async {
  DateTime fechaNotificacion = cita.fecha.subtract(intervalo);

  // Solo programar si la fecha de notificación es futura
  if (fechaNotificacion.isAfter(DateTime.now())) {
    try {
      await flutterLocalNotificationsPlugin.zonedSchedule(
        cita.idCita, // ID único para la notificación
        "Cita ${cita.idCita}", // Título de la notificación
        "$mensajePersonalizado el ${DateFormat('dd/MM/yyyy').format(cita.fecha)} a las ${cita.horaInicio}", // Cuerpo de la notificación
        _convertToTZDateTime(
            fechaNotificacion), // Fecha y hora de la notificación
        const NotificationDetails(
          android: AndroidNotificationDetails(
            "channel_id", // ID del canal
            "Notificaciones", // Nombre visible para el canal
            importance: Importance.max,
            priority: Priority.high,
          ),
        ),
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
      );
    } catch (e) {
      print("Error al programar notificación para ${cita.idCita}: $e");
    }
  }
}

// Mostrar una notificación inmediata
Future<void> _mostrarNotificacionInmediata(
    int id, String titulo, String mensaje) async {
  await flutterLocalNotificationsPlugin.show(
    id,
    titulo,
    mensaje,
    const NotificationDetails(
      android: AndroidNotificationDetails(
        "expired_channel_id", // Canal para notificaciones inmediatas
        "Citas Expiradas", // Nombre del canal
        importance: Importance.max,
        priority: Priority.high,
      ),
    ),
  );

  // Marcar la notificación como vista
  await _marcarNotificacionComoVista(id);
}

// Convertir una fecha a una zona horaria local
tz.TZDateTime _convertToTZDateTime(DateTime fecha) {
  return tz.TZDateTime(
    tz.local,
    fecha.year,
    fecha.month,
    fecha.day,
    fecha.hour,
    fecha.minute,
  );
}

// Función para marcar una notificación como vista
Future<void> _marcarNotificacionComoVista(int idCita) async {
  await storage.write(key: 'notificacion_$idCita', value: 'vista');
}

// Función para comprobar si una notificación ya fue vista
Future<bool> _notificacionYaVista(int idCita) async {
  String? estado = await storage.read(key: 'notificacion_$idCita');
  return estado == 'vista';
}
// ###