import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';

// Provider para obtener los datos del payload

class AuthProvider with ChangeNotifier {
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  String? idUsuario;
  String? nombre;
  String? rol;

  Future<void> cargarDatos() async {
    final token = await _storage.read(key: 'jwt_token');
    if (token != null) {
      final parts = token.split('.');
      if (parts.length == 3) {
        final payload =
            utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
        final data = json.decode(payload);
        idUsuario = data['id_usuario'];
        nombre = data['nombre_usuario'];
        rol = data['nombre_rol'];
        notifyListeners();
      }
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token'); // Eliminar token del storage
    idUsuario = null;
    nombre = null;
    rol = null;
    notifyListeners(); // Notificar a UI que el usuario cerro sesion
  }
}
