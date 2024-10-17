import 'package:flutter/material.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:mobile/widgets/appointment_item.dart';
import 'package:mobile/colors.dart';
import 'package:intl/intl.dart'; // Importar intl para obtener el mes actual
import 'package:shared_preferences/shared_preferences.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  AppointmentScreenState createState() => AppointmentScreenState();
}

class AppointmentScreenState extends State<AppointmentScreen> {
  List<Map<String, String>> appointments = [];

  @override
  void initState() {
    super.initState();
    _loadAppointments();
  }

  // Cargar las citas guardadas en SharedPreferences para el usuario
  Future<void> _loadAppointments() async {
    final prefs = await SharedPreferences.getInstance();
    final storedAppointments = prefs.getStringList('appointments') ?? [];

    List<Map<String, String>> loadedAppointments =
        storedAppointments.map((appointment) {
      List<String> parts = appointment.split(';');
      if (parts.length == 3) {
        // Ahora esperamos tres partes: título, fecha y hora
        return {'title': parts[0], 'date': parts[1], 'time': parts[2]};
      } else {
        return {
          'title': 'Cita inválida',
          'date': 'Fecha no disponible',
          'time': 'Hora no disponible'
        };
      }
    }).toList();

    setState(() {
      appointments = loadedAppointments;
    });
  }

  // Función para borrar todas las citas guardadas de un usuario
  Future<void> _clearAppointments() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('appointments');

    setState(() {
      appointments = []; // Limpiar la lista en memoria también
    });

    if (!mounted) return;

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text("Citas eliminadas"),
        content: Text("Todas las citas para este usuario han sido borradas."),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("OK"),
          ),
        ],
      ),
    );
  }

  List<Map<String, String>> getExpiredAppointments() {
    return appointments.where((appointment) {
      if (appointment['date'] == 'Fecha no disponible') {
        return false;
      }
      DateTime appointmentDate;
      try {
        appointmentDate = DateFormat('dd/MM/yyyy').parse(appointment['date']!);
      } catch (e) {
        return false;
      }
      return appointmentDate.isBefore(DateTime.now());
    }).toList();
  }

  List<Map<String, String>> getThisWeekAppointments() {
    DateTime now = DateTime.now();
    DateTime startOfWeek = now.subtract(Duration(days: now.weekday - 1));
    DateTime endOfWeek = startOfWeek.add(Duration(days: 6));

    return appointments.where((appointment) {
      if (appointment['date'] == 'Fecha no disponible') {
        return false;
      }
      DateTime appointmentDate;
      try {
        appointmentDate = DateFormat('dd/MM/yyyy').parse(appointment['date']!);
      } catch (e) {
        return false;
      }

      // Excluir citas que ya expiraron
      if (appointmentDate.isBefore(DateTime.now())) {
        return false;
      }

      return appointmentDate.isAfter(startOfWeek) &&
          appointmentDate.isBefore(endOfWeek);
    }).toList();
  }

  List<Map<String, String>> getCurrentMonthAppointments() {
    DateTime now = DateTime.now();
    return appointments.where((appointment) {
      if (appointment['date'] == 'Fecha no disponible') {
        return false;
      }
      DateTime appointmentDate;
      try {
        appointmentDate = DateFormat('dd/MM/yyyy').parse(appointment['date']!);
      } catch (e) {
        return false;
      }

      // Excluir citas que ya expiraron
      if (appointmentDate.isBefore(DateTime.now())) {
        return false;
      }

      return appointmentDate.month == now.month &&
          appointmentDate.year == now.year;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return DefaultTabController(
      length: 3,
      initialIndex: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Agendado'),
          actions: [
            IconButton(
              icon: Icon(Icons.delete),
              onPressed: _clearAppointments, // Botón para borrar las citas
            ),
          ],
        ),
        body: Column(
          children: [
            SizedBox(height: size.height * 0.02),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Container(
                height: size.height * 0.08, // Tamaño dinámico
                margin: EdgeInsets.symmetric(horizontal: size.width * 0.04),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: AppColors.secondaryColor,
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
                child: const TabBar(
                  indicatorSize: TabBarIndicatorSize.tab,
                  dividerColor: Colors.transparent,
                  indicator: BoxDecoration(
                    color: AppColors.primaryColor,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: Colors.black54,
                  tabs: [
                    TabItem(title: 'Expiro'),
                    TabItem(title: 'Semanal'),
                    TabItem(title: 'Mensual'),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TabBarView(
                children: [
                  AppointmentItem(
                    title: 'Expiro',
                    appointments: getExpiredAppointments(),
                  ),
                  AppointmentItem(
                    title: 'Esta Semana',
                    appointments: getThisWeekAppointments(),
                  ),
                  AppointmentItem(
                    title: "Este mes",
                    appointments: getCurrentMonthAppointments(),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
