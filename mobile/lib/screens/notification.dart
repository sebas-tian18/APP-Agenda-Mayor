import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Import para formatear fechas
import 'package:mobile/models/cita.dart';

class NotificationScreen extends StatelessWidget {
  final List<Cita> appointments;

  const NotificationScreen({super.key, required this.appointments});

  // Citas para hoy
  List<Cita> getTodayAppointments() {
    DateTime now = DateTime.now();
    return appointments.where((cita) {
      return cita.fecha.year == now.year &&
          cita.fecha.month == now.month &&
          cita.fecha.day == now.day;
    }).toList();
  }

  // Citas en los próximos 3 días
  List<Cita> getAppointmentsInThreeDays() {
    DateTime now = DateTime.now();
    DateTime threeDaysFromNow = now.add(const Duration(days: 3));
    return appointments.where((cita) {
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(threeDaysFromNow);
    }).toList();
  }

  // Citas en la próxima semana
  List<Cita> getAppointmentsInOneWeek() {
    DateTime now = DateTime.now();
    DateTime oneWeekFromNow = now.add(const Duration(days: 7));
    return appointments.where((cita) {
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(oneWeekFromNow);
    }).toList();
  }

  // Citas expiradas
  List<Cita> getExpiredAppointments() {
    DateTime now = DateTime.now();
    return appointments.where((cita) {
      return cita.fecha.isBefore(now);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final today = getTodayAppointments();
    final inThreeDays = getAppointmentsInThreeDays();
    final inOneWeek = getAppointmentsInOneWeek();
    final expired = getExpiredAppointments();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notificaciones'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          if (today.isNotEmpty) _buildSection("Hoy", today, context),
          if (inThreeDays.isNotEmpty)
            _buildSection("En los próximos 3 días", inThreeDays, context),
          if (inOneWeek.isNotEmpty)
            _buildSection("En la próxima semana", inOneWeek, context),
          if (expired.isNotEmpty)
            _buildSection("Citas expiradas", expired, context),
          if (today.isEmpty &&
              inThreeDays.isEmpty &&
              inOneWeek.isEmpty &&
              expired.isEmpty)
            const Center(
              child: Padding(
                padding: EdgeInsets.only(top: 50.0),
                child: Text(
                  'No hay notificaciones disponibles',
                  style: TextStyle(fontSize: 16),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildSection(
      String title, List<Cita> appointments, BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 8.0),
          child: Text(
            title,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        ...appointments.map((cita) => _appointmentCard(cita, context)),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _appointmentCard(Cita cita, BuildContext context) {
    final formattedDate = DateFormat('dd/MM/yyyy').format(cita.fecha);
    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Theme.of(context).primaryColor,
          child: const Icon(Icons.calendar_today, color: Colors.white),
        ),
        title: Text(
          "Cita ${cita.idCita}",
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Fecha: $formattedDate"),
            Text("Hora: ${cita.horaInicio} - ${cita.horaTermino}"),
          ],
        ),
        trailing: IconButton(
          icon: const Icon(Icons.more_vert),
          onPressed: () {
            // Puedes agregar un menú contextual aquí
          },
        ),
      ),
    );
  }
}
