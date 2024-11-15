import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'api_client.dart';

class AppointmentService {
  final ApiClient _apiClient = ApiClient();

  // Obtener las citas disponibles para un servicio específico
  Future<List<dynamic>> getAvailableAppointments(int serviceId) async {
    try {
      final response =
          await _apiClient.client.get('/citas/$serviceId/noagendadas');

      // Verificar si la respuesta contiene citas
      if (response.data['data'] != null && response.data['data'].isNotEmpty) {
        return response.data['data'];
      } else {
        return []; // Devolver una lista vacía si no hay citas
      }
    } catch (e) {
      print("Error al obtener citas: $e");
      throw Exception('No se pudieron obtener las citas disponibles');
    }
  }

  // Agendar una cita para el usuario que está autenticado
  Future<void> bookAppointment(int appointmentId, BuildContext context) async {
    try {
      // Obtener el idUsuario desde el AuthProvider
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final userId = authProvider.idUsuario;

      if (userId == null) {
        throw Exception('No se pudo obtener el ID del usuario');
      }

      final response = await _apiClient.client.patch(
        '/citas/agendar/$appointmentId',
        data: {'id_usuario': userId},
      );
      if (response.statusCode != 200) {
        throw Exception('Error al agendar la cita');
      }

      print('Cita agendada con éxito');
    } catch (e) {
      print("Error al agendar cita: $e");
      throw Exception('No se pudo agendar la cita');
    }
  }
}
