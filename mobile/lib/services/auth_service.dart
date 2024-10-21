import 'package:dio/dio.dart';

final dio = Dio();

class AuthResponse {
  final bool isAuthenticated;
  final String message;
  final String? token; // Almacenar el token

  AuthResponse(
      {required this.isAuthenticated, required this.message, this.token});
}

class AuthService {
  // Endpoint del login en el backend
  final String _baseUrl = 'http://10.0.2.2:3000/api/login';

  Future<AuthResponse> userLogin(String correo, String contrasena) async {
    try {
      var data = {
        "correo": correo,
        "contrasena": contrasena,
      };

      // Post al endpoint con los datos correo y contrasena, header json
      final response = await dio.post(
        _baseUrl,
        data: data,
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      // Si no hay errores
      if (response.statusCode == 200) {
        final token = response.data['token']; // Se obtiene el token
        return AuthResponse(
          isAuthenticated: true,
          message: 'Autenticación exitosa',
          token: token, // Devolver el token
        );
      } else {
        return _handleHttpError(response.statusCode);
      }
    } catch (e) {
      if (e is DioException && e.response != null) {
        return _handleHttpError(e.response?.statusCode);
      }
      return AuthResponse(
          isAuthenticated: false, message: 'Error en la red o conexión');
    }
  }

  AuthResponse _handleHttpError(int? statusCode) {
    switch (statusCode) {
      case 400:
        return AuthResponse(
            isAuthenticated: false, message: 'Solicitud incorrecta');
      case 404:
        return AuthResponse(
            isAuthenticated: false, message: 'Correo no registrado');
      case 401:
        return AuthResponse(
            isAuthenticated: false, message: 'Contraseña incorrecta');
      case 500:
        return AuthResponse(
            isAuthenticated: false,
            message: 'Error en el servidor, intente de nuevo más tarde');
      default:
        return AuthResponse(
            isAuthenticated: false, message: 'Error desconocido');
    }
  }
}
