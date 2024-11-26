import 'package:flutter/material.dart';
import 'package:mobile/services/citas_service.dart';
import 'package:mobile/models/cita.dart';

class CitasProvider with ChangeNotifier {
  final CitasService _citasService = CitasService();
  List<Cita> _citas = [];
  Set<int> vistas = {}; // IDs de las citas vistas
  String? _errorMessage;

  List<Cita> get citas => _citas;
  String? get errorMessage => _errorMessage;

  // Getter para el número de notificaciones no vistas
  int get notificacionesNoVistas =>
      _citas.where((cita) => !vistas.contains(cita.idCita)).length;

  // Verifica si hay citas no vistas
  bool get hasUnseenNotifications => notificacionesNoVistas > 0;

  Future<void> cargarCitasPorUsuario(int userId) async {
    try {
      // Cargar las citas desde el servicio
      _citas = await _citasService.obtenerCitasPorUsuario(userId);

      // Agregar una cita ficticia para pruebas
      // _citas.add(
      //   Cita(
      //     idCita: 999, // ID único
      //     fecha: DateTime(2024, 11, 26), // Fecha actual
      //     horaInicio: "20:00", // Hora ficticia
      //     horaTermino: "21:00", // Hora ficticia
      //     asistencia: 1,
      //     atencionADomicilio: 1,
      //     nombreEstado: "bueno",
      //     nombreProfesional: "jose",
      //     nombreResolucion: "si",
      //   ),
      // );

      _errorMessage = null; // Resetear el mensaje de error si no hay problemas
    } catch (e) {
      _errorMessage = 'Error al cargar citas'; // Capturar error
    }

    notifyListeners(); // Notificar a los widgets dependientes
  }

  // Marca una cita como vista
  void marcarCitaComoVista(int idCita) {
    vistas.add(idCita);
    notifyListeners();
  }

  // Marca todas las citas como vistas
  void marcarNotificacionesComoVistas() {
    vistas.addAll(_citas.map((cita) => cita.idCita));
    notifyListeners();
  }
}
