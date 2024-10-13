import 'package:flutter/material.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:mobile/widgets/appointment_item.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class AppointmentScreen extends StatelessWidget {
  const AppointmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: const CustomAppBar(title: 'Agendado'),
        body: Column(
          children: [
            SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Container(
                height: 60,
                margin: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.green.shade100,
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
                child: const TabBar(
                  indicatorSize: TabBarIndicatorSize.tab,
                  dividerColor: Colors.transparent,
                  indicator: BoxDecoration(
                    color: Colors.green,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: Colors.black54,
                  tabs: [
                    TabItem(title: 'Expiro'),
                    TabItem(title: 'Días'),
                    TabItem(title: 'Semanas'),
                    TabItem(title: 'Meses'),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TabBarView(
                children: [
                  AppointmentItem(
                    title: 'Expiro',
                    appointments: [
                      {'title': 'Cita 1', 'date': '05/09/2024'},
                      // Agrega más citas si es necesario
                    ],
                  ),
                  AppointmentItem(
                    title: 'Hoy ',
                    appointments: [
                      {'title': 'Psicólogo', 'date': '06/09/2024'},
                      {'title': 'Kinesiólogo', 'date': '07/09/2024'},
                    ],
                  ),
                  AppointmentItem(
                    title: 'Esta Semana',
                    appointments: [
                      {'title': 'Consulta Médica', 'date': '08/09/2024'},
                      // Más citas
                    ],
                  ),
                  AppointmentItem(
                    title: 'SEPTIEMBRE',
                    appointments: [
                      {'title': 'Dentista', 'date': '09/09/2024'},
                      {'title': 'Abogado', 'date': '10/09/2024'},
                    ],
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
