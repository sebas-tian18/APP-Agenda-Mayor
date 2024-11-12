import 'package:dio/dio.dart'; // Importar dio para manejo HTTP
import 'package:mobile/services/jwt_service.dart'; // Importar JwtService
import 'package:mobile/services/api_client.dart'; // Importar ApiClient

final dio = Dio();

class AuthResponse {
  final bool isAuthenticated;
  final String message;
  final String? token;

  AuthResponse(
      {required this.isAuthenticated, required this.message, this.token});
}

class AuthService {
  final ApiClient _apiClient =
      ApiClient(); // Reutiliza la instancia de ApiClient
  final JwtService _jwtService = JwtService(); // Instancia de JwtService

  Future<AuthResponse> userLogin(String correo, String contrasena) async {
    try {
      var data = {
        "correo": correo,
        "contrasena": contrasena,
      };

      // Realiza la solicitud POST usando _apiClient en lugar de dio directamente
      final response = await _apiClient.client.post(
        '/login', // Endpoint relativo
        data: data,
      );

      // Si autenticacion es exitosa guarda el token y devuelve el resultado
      if (response.statusCode == 200) {
        final token = response.data['token']; // Obtener token
        await _jwtService.saveToken(token); // Guardar el token
        return AuthResponse(
          isAuthenticated: true,
          message: 'Autenticación exitosa',
          token: token,
        );
      } else {
        // Extraer y mostrar el mensaje de error enviado por el backend
        final message = response.data['message'] ?? 'Error desconocido';
        return AuthResponse(
          isAuthenticated: false,
          message: message,
        );
      }
    } catch (e) {
      // Muestra el mensaje dependiendo si viene del backend, null o dio
      if (e is DioException && e.response != null) {
        final message = e.response?.data['message'] ?? 'Error desconocido';
        return AuthResponse(
          isAuthenticated: false,
          message: message,
        );
      }
      return AuthResponse(
          isAuthenticated: false, message: 'Error en la red o conexión');
    }
  }
}
