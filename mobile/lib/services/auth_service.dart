import 'package:dio/dio.dart';

final dio = Dio();

class AuthResponse {
  final bool isAuthenticated;
  final String message;

  AuthResponse({required this.isAuthenticated, required this.message});
}

Future<AuthResponse> userLogin(String correo, String contrasena) async {
  try {
    // crear Map para enviar los datos
    var data = {
      "correo": correo,
      "contrasena": contrasena,
    };

    final response = await dio.post(
      'http://10.0.2.2:3000/usuarios/login',
      data: data, // Map
      options: Options(
        headers: {
          'Content-Type': 'application/json',
        },
      ),
    );

    if (response.statusCode == 200) {
      return AuthResponse(
          isAuthenticated: true, message: 'Autenticación exitosa');
    } else {
      return AuthResponse(isAuthenticated: false, message: 'Error desconocido');
    }
  } catch (e) {
    // Si el error es por parte de Dio
    if (e is DioException) {
      if (e.response != null) {
        // Se manejan errores basados en el codigo de estado enviado por la API
        if (e.response?.statusCode == 400) {
          return AuthResponse(
              isAuthenticated: false, message: 'Solicitud incorrecta');
        } else if (e.response?.statusCode == 404) {
          return AuthResponse(
              isAuthenticated: false, message: 'Correo no registrado');
        } else if (e.response?.statusCode == 401) {
          return AuthResponse(
              isAuthenticated: false,
              message: 'Contraseña incorrecta, intente nuevamente');
        } else if (e.response?.statusCode == 500) {
          return AuthResponse(
              isAuthenticated: false,
              message: 'Error en el servidor, intente de nuevo mas tarde');
        }
      }
      return AuthResponse(
          isAuthenticated: false, message: 'Error en la red o conexión');
    }
    // Mostrar la excepcion inesperada
    throw Exception('Error inesperado: $e');
  }
}

// Template para requests:
//Future<void> http() async {
//  try {
//    //aqui anadir la logica de envio o recibo
//  } catch (e) {
//    print('Error: $e');
//  }
//}
