import 'package:flutter/material.dart';
import 'package:mobile/colors.dart';
import 'package:mobile/models/cita.dart';
import 'package:intl/intl.dart'; // Para manejar tiempo
import 'package:provider/provider.dart';
import 'package:mobile/providers/theme_notifier.dart';

class AppointmentItem extends StatelessWidget {
  final String title;
  final List<Cita> appointments;
  final String emptyMessage;

  const AppointmentItem({
    super.key,
    required this.title,
    required this.appointments,
    this.emptyMessage = 'No hay citas disponibles',
  });

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final size = MediaQuery.of(context).size;
    final theme = Theme.of(context);

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.02),
            Container(
              padding: EdgeInsets.all(size.width * 0.04),
              decoration: BoxDecoration(
                color: themeNotifier.isDarkMode
                    ? AppColors.primaryColorDark
                    : AppColors.primaryColor,
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.5),
                    spreadRadius: 1,
                    blurRadius: 1,
                    offset: Offset(1, 1),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    child: Text(
                      title,
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: size.width * 0.06),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      '${appointments.length} Citas',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: size.width * 0.06),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.02),
            Expanded(
              child: appointments.isEmpty
                  ? Center(
                      child: Text(
                        emptyMessage,
                        style: TextStyle(
                          fontSize: size.width * 0.05,
                          fontWeight: FontWeight.bold,
                          color: theme.textTheme.bodyLarge!.color,
                        ),
                      ),
                    )
                  : ListView(
                      children: appointments.map((cita) {
                        return _appointmentTile(
                          cita,
                          size,
                          theme,
                        );
                      }).toList(),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _appointmentTile(Cita cita, Size size, ThemeData theme) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: size.height * 0.01),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: BorderSide(
            color: theme.dividerColor,
            width: 1,
          ),
        ),
        elevation: 6,
        color: theme.cardColor,
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                title: Text(
                  "Cita ${cita.idCita}", // Cambiar a nombre servicio
                  style: TextStyle(
                      fontSize: size.width * 0.070,
                      fontWeight: FontWeight.bold,
                      color: theme.textTheme.bodyLarge!.color),
                ),
              ),
              Divider(thickness: 4, color: theme.dividerColor),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.calendar_today, color: AppColors.primaryColor),
                      SizedBox(width: 10),
                      Flexible(
                        child: Text(
                          "Fecha: ${DateFormat('dd/MM/yyyy').format(cita.fecha)}",
                          style: TextStyle(
                            fontSize: size.width * 0.055,
                            fontWeight: FontWeight.bold,
                            color: theme.textTheme.bodyLarge!.color,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.access_time, color: AppColors.primaryColor),
                      SizedBox(width: 10),
                      Flexible(
                        child: Text(
                          "Hora: ${cita.horaInicio} - ${cita.horaTermino}",
                          style: TextStyle(
                            fontSize: size.width * 0.055,
                            fontWeight: FontWeight.bold,
                            color: theme.textTheme.bodyLarge!.color,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.person, color: AppColors.primaryColor),
                      SizedBox(width: 10),
                      Flexible(
                        child: Text(
                          "Profesional: ${cita.nombreProfesional}",
                          style: TextStyle(
                            fontSize: size.width * 0.055,
                            fontWeight: FontWeight.bold,
                            color: theme.textTheme.bodyLarge!.color,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.check_circle, color: AppColors.primaryColor),
                      SizedBox(width: 10),
                      Flexible(
                        child: Text(
                          "Estado: ${cita.nombreEstado}",
                          style: TextStyle(
                            fontSize: size.width * 0.055,
                            fontWeight: FontWeight.bold,
                            color: theme.textTheme.bodyLarge!.color,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
