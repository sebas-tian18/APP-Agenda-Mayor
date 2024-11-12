import 'package:flutter/material.dart';
import 'package:mobile/services/citas_service.dart';
import 'package:mobile/models/cita.dart';

class CitasProvider with ChangeNotifier {
  final CitasService _citasService = CitasService();
  List<Cita> _citas = [];
  String? _errorMessage;

  List<Cita> get citas => _citas;
  String? get errorMessage => _errorMessage;

  Future<void> cargarCitasPorUsuario(int userId) async {
    try {
      _citas = await _citasService.obtenerCitasPorUsuario(userId);
      _errorMessage = null;
    } catch (e) {
      _errorMessage = 'Error al cargar citas';
    }
    notifyListeners();
  }
}
