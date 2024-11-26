import 'package:mobile/services/api_client.dart';
import 'package:mobile/models/cita.dart';

class CitasService {
  final ApiClient _apiClient = ApiClient();

  Future<List<Cita>> obtenerCitasPorUsuario(int userId) async {
    try {
      final response = await _apiClient.client.get('/usuarios/$userId/citas');
      List<dynamic> data = response.data;
      return data
          .map((json) => Cita.fromJson(json))
          .toList(); // Mapea lista de Citas
    } catch (e) {
      throw Exception('Error al obtener citas del usuario');
    }
  }
}
