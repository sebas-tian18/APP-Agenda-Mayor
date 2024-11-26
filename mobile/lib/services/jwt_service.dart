import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class JwtService {
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  final String _tokenKey = 'jwt_token';

  // Guardar token
  Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  // Obtener token
  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // Eliminar token
  Future<void> deleteToken() async {
    await _storage.delete(key: _tokenKey);
  }
}
