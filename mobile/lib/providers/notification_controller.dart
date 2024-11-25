import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;
import 'package:permission_handler/permission_handler.dart';
import 'package:intl/intl.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/models/cita.dart';

class NotificationService {
  NotificationService._privateConstructor();

  static final NotificationService _instance =
      NotificationService._privateConstructor();
  static final FlutterLocalNotificationsPlugin
      _flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  static final FlutterSecureStorage _storage = FlutterSecureStorage();

  factory NotificationService() => _instance;

  Future<void> initialize() async {
    tz.initializeTimeZones();

    // Solicitar permisos para notificaciones
    if (await Permission.notification.isDenied) {
      await Permission.notification.request();
    }

    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('icono_notificacion');

    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings();

    const InitializationSettings initializationSettings =
        InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );

    await _flutterLocalNotificationsPlugin.initialize(
      initializationSettings,
      onDidReceiveNotificationResponse: (NotificationResponse response) {
        print('Notificación recibida con ID: ${response.id}');
      },
    );
  }

  // Método para resetear los estados (usado en pruebas)
  Future<void> resetAllNotifications() async {
    await _storage
        .deleteAll(); // Borra todas las claves en el almacenamiento seguro
    print("Todos los estados de notificaciones fueron reseteados.");
  }

  Future<void> programNotifications(List<Cita> citas) async {
    final DateTime now = DateTime.now();

    for (var cita in citas) {
      String? notificationKey =
          await _storage.read(key: 'notification_cita_${cita.idCita}');
      if (notificationKey == 'scheduled') {
        // La notificación ya está programada para esta cita
        continue;
      }

      String fecha = DateFormat('dd/MM/yyyy').format(cita.fecha);
      String hora = "${cita.horaInicio} - ${cita.horaTermino}";
      String titulo = "Cita ${cita.idCita}";

      // Mostrar notificación inmediata si la cita ha expirado
      if (cita.fecha.isBefore(now)) {
        await _showImmediateNotification(cita.idCita, "$titulo - Expirada",
            "La cita programada para el $fecha a las $hora ha expirado.");
      }

      // Programar notificaciones para citas futuras
      if (!cita.fecha.isBefore(now)) {
        await _scheduleNotification(
            cita, Duration(days: 7), "Falta 1 semana para tu cita");
        await _scheduleNotification(
            cita, Duration(days: 3), "Faltan 3 días para tu cita");
        await _scheduleNotification(
            cita, Duration(days: 0), "Hoy es el día de tu cita");

        // Marcar notificaciones como programadas para esta cita
        await _storage.write(
            key: 'notification_cita_${cita.idCita}', value: 'scheduled');
      }
    }
  }

  Future<void> _scheduleNotification(
      Cita cita, Duration interval, String message) async {
    final DateTime now = DateTime.now();
    final DateTime scheduledDate = cita.fecha.subtract(interval);

    print("Intentando programar notificación para cita ${cita.idCita}");
    print("Fecha programada: $scheduledDate, Fecha actual: $now");

    if (scheduledDate.isBefore(now)) {
      print("La fecha programada ya pasó para la cita ${cita.idCita}.");
      return;
    }

    try {
      await _flutterLocalNotificationsPlugin.zonedSchedule(
        cita.idCita,
        "Cita ${cita.idCita}",
        "$message el ${DateFormat('dd/MM/yyyy').format(cita.fecha)} a las ${cita.horaInicio}",
        _toTZDateTime(scheduledDate),
        const NotificationDetails(
          android: AndroidNotificationDetails(
            "channel_id",
            "Notificaciones",
            importance: Importance.max,
            priority: Priority.high,
          ),
        ),
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
      );
      print("Notificación programada correctamente para cita ${cita.idCita}");
    } catch (e) {
      print("Error programando notificación para ${cita.idCita}: $e");
    }
  }

  Future<void> _showImmediateNotification(
      int id, String title, String message) async {
    bool alreadyNotified = await _isNotificationSeen(id);
    if (!alreadyNotified) {
      await _flutterLocalNotificationsPlugin.show(
        id,
        title,
        message,
        const NotificationDetails(
          android: AndroidNotificationDetails(
            "expired_channel_id",
            "Citas Expiradas",
            importance: Importance.max,
            priority: Priority.high,
          ),
        ),
      );
      await _markNotificationAsSeen(id);
    } else {
      print("Notificación inmediata ya vista: ID $id");
    }
  }

  tz.TZDateTime _toTZDateTime(DateTime date) {
    return tz.TZDateTime(
      tz.local,
      date.year,
      date.month,
      date.day,
      date.hour,
      date.minute,
    );
  }

  Future<void> _markNotificationAsSeen(int id) async {
    await _storage.write(key: 'notification_$id', value: 'seen');
  }

  Future<bool> _isNotificationSeen(int id) async {
    String? state = await _storage.read(key: 'notification_$id');
    return state == 'seen';
  }
}
