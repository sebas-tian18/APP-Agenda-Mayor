import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Servicio base para todas las requests

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  final Dio _dio = Dio();
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  factory ApiClient() {
    return _instance;
  }

  ApiClient._internal() {
    _dio.options.baseUrl = 'http://10.0.2.2:3000/api/';
    _dio.options.headers['Content-Type'] = 'application/json';

    // Interceptor para enviar el token en cada request
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          String? token = await _storage.read(key: 'token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) {
          if (error.response?.statusCode == 401) {
            // Logica para renovar el token ...Soon(tm)
          }
          return handler.next(error);
        },
      ),
    );
  }

  Dio get client => _dio;
}
