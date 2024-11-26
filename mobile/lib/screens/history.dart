import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Import para formatear fechas
import 'package:mobile/models/cita.dart';

class HistoryScreen extends StatelessWidget {
  final bool fromNavigationMenu;
  final List<Cita> appointments;

  HistoryScreen(
      {super.key, required this.appointments, this.fromNavigationMenu = true});

  List<Cita> getExpiredAppointments() {
    DateTime now = DateTime.now();
    return appointments.where((cita) {
      return cita.fecha.isBefore(now);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    List<Cita> expiredAppointments = getExpiredAppointments();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Historial'),
        leading: fromNavigationMenu
            ? null
            : IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Navigator.pop(context),
              ),
      ),
      body: ListView.builder(
        itemCount: expiredAppointments.length,
        itemBuilder: (context, index) {
          Cita cita = expiredAppointments[index];
          final formattedDate = DateFormat('dd/MM/yyyy').format(cita.fecha);

          return Card(
            elevation: 4,
            margin: const EdgeInsets.symmetric(vertical: 8.0),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0)),
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
        },
      ),
    );
  }
}
