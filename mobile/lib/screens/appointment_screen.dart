import 'package:flutter/material.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:mobile/widgets/appointment_item.dart';
import 'package:mobile/colors.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/citas_provider.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/models/cita.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  AppointmentScreenState createState() => AppointmentScreenState();
}

class AppointmentScreenState extends State<AppointmentScreen> {
  List<Cita> appointments = [];

  @override
  void initState() {
    super.initState();
    _loadAppointments();
  }

  // Cargar las citas del usuario
  Future<void> _loadAppointments() async {
    final citasProvider = Provider.of<CitasProvider>(context, listen: false);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    if (authProvider.idUsuario != null) {
      // Obtener citas a traves del provider
      await citasProvider.cargarCitasPorUsuario(authProvider.idUsuario!);
      setState(() {
        appointments = citasProvider.citas;
      });
    } else {
      // Manejo de error si el ID del usuario no está disponible
      print('Error: ID de usuario no disponible');
    }
  }

  List<Cita> getExpiredAppointments() {
    return appointments
        .where((cita) => cita.fecha.isBefore(DateTime.now()))
        .toList();
  }

  List<Cita> getThisWeekAppointments() {
    DateTime now = DateTime.now();
    DateTime startOfWeek = now.subtract(Duration(days: now.weekday - 1));
    DateTime endOfWeek = startOfWeek.add(Duration(days: 6));

    return appointments
        .where((cita) =>
            cita.fecha.isAfter(startOfWeek) &&
            cita.fecha.isBefore(endOfWeek) &&
            cita.fecha.isAfter(DateTime.now()))
        .toList();
  }

  List<Cita> getCurrentMonthAppointments() {
    DateTime now = DateTime.now();
    return appointments
        .where((cita) =>
            cita.fecha.month == now.month &&
            cita.fecha.year == now.year &&
            cita.fecha.isAfter(DateTime.now()))
        .toList();
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
              // Boton para borrar cita, falta crear el endpoint
              icon: Icon(Icons.delete),
              onPressed: () => setState(() => appointments = []),
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
