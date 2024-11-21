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
      _citas = await _citasService.obtenerCitasPorUsuario(userId);
      _errorMessage = null;
    } catch (e) {
      _errorMessage = 'Error al cargar citas';
    }
    notifyListeners();
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
