import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Import para formatear fechas
import 'package:mobile/models/cita.dart';

class NotificationScreen extends StatelessWidget {
  final List<Cita> appointments;

  const NotificationScreen({super.key, required this.appointments});

  List<Cita> getTodayAppointments() {
    DateTime now = DateTime.now();
    return appointments.where((cita) {
      return cita.fecha.year == now.year &&
          cita.fecha.month == now.month &&
          cita.fecha.day == now.day;
    }).toList();
  }

  List<Cita> getAppointmentsInThreeDays() {
    DateTime now = DateTime.now();
    DateTime threeDaysFromNow = now.add(const Duration(days: 3));
    return appointments.where((cita) {
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(threeDaysFromNow);
    }).toList();
  }

  List<Cita> getAppointmentsInOneWeek() {
    DateTime now = DateTime.now();
    DateTime oneWeekFromNow = now.add(const Duration(days: 7));
    return appointments.where((cita) {
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(oneWeekFromNow);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final today = getTodayAppointments();
    final inThreeDays = getAppointmentsInThreeDays();
    final inOneWeek = getAppointmentsInOneWeek();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notificaciones'),
      ),
      body: ListView(
        children: [
          if (today.isNotEmpty) _buildSection("Hoy", today),
          if (inThreeDays.isNotEmpty)
            _buildSection("En los próximos 3 días", inThreeDays),
          if (inOneWeek.isNotEmpty)
            _buildSection("En la próxima semana", inOneWeek),
          if (today.isEmpty && inThreeDays.isEmpty && inOneWeek.isEmpty)
            const Center(child: Text('No hay notificaciones disponibles')),
        ],
      ),
    );
  }

  Widget _buildSection(String title, List<Cita> appointments) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              title,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          ...appointments.map((cita) => _appointmentTile(cita)),
        ],
      ),
    );
  }

  Widget _appointmentTile(Cita cita) {
    final formattedDate = DateFormat('dd/MM/yyyy').format(cita.fecha);
    return ListTile(
      title: Text("Cita ${cita.idCita}"),
      subtitle: Text(
          "Fecha: $formattedDate, Hora: ${cita.horaInicio} - ${cita.horaTermino}"),
    );
  }
}
