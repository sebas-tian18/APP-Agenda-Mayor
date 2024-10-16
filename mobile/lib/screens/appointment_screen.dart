import 'package:flutter/material.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:mobile/widgets/appointment_item.dart';
import 'package:mobile/widgets/custom_app_bar.dart';
import 'package:mobile/colors.dart';
import 'package:intl/intl.dart'; // Importar intl para obtener el mes actual

class AppointmentScreen extends StatelessWidget {
  const AppointmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Obtener el nombre del mes actual
    String currentMonth =
        DateFormat.MMMM('es_ES').format(DateTime.now()).toUpperCase();

    return DefaultTabController(
      length: 3,
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
                    title: 'Esta Semana',
                    appointments: [
                      {'title': 'peluquero', 'date': '16/10/2024'},
                      // Más citas
                    ],
                  ),
                  AppointmentItem(
                    title: currentMonth,
                    appointments: [
                      {'title': 'peluquero', 'date': '16/10/2024'},
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
