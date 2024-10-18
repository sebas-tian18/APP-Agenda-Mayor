import 'package:flutter/material.dart';
import 'package:mobile/colors.dart';

class AppointmentItem extends StatelessWidget {
  final String title;
  final List<Map<String, String>> appointments;

  const AppointmentItem(
      {super.key, required this.title, required this.appointments});

  @override
  Widget build(BuildContext context) {
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
                color: AppColors.primaryColor,
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
                      overflow: TextOverflow.ellipsis, // Agregado
                    ),
                  ),
                  Flexible(
                    child: Text(
                      '${appointments.length} Citas',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: size.width * 0.06),
                      overflow: TextOverflow.ellipsis, // Agregado
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.02),
            Expanded(
              child: ListView(
                children: appointments.map((appointment) {
                  return _appointmentTile(
                      appointment['title']!,
                      appointment['date']!,
                      appointment['time']!,
                      appointment['name']!,
                      appointment['location']!,
                      size,
                      theme);
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _appointmentTile(String title, String date, String time, String name,
      String location, Size size, ThemeData theme) {
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
                  title,
                  style: TextStyle(
                      fontSize: size.width * 0.070,
                      fontWeight: FontWeight.bold,
                      color: theme.textTheme.bodyLarge!.color),
                ),
              ),
              Divider(thickness: 4, color: theme.dividerColor),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    // Agregado
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.calendar_today, color: Colors.green),
                            SizedBox(width: 10),
                            Flexible(
                              // Agregado
                              child: Text(
                                "Fecha: $date",
                                style: TextStyle(
                                  fontSize: size.width * 0.055,
                                  fontWeight: FontWeight.bold,
                                  color: theme.textTheme.bodyLarge!.color,
                                ),
                                overflow: TextOverflow.ellipsis, // Agregado
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.access_time, color: Colors.green),
                            SizedBox(width: 10),
                            Flexible(
                              // Agregado
                              child: Text(
                                "Hora: $time",
                                style: TextStyle(
                                  fontSize: size.width * 0.055,
                                  fontWeight: FontWeight.bold,
                                  color: theme.textTheme.bodyLarge!.color,
                                ),
                                overflow: TextOverflow.ellipsis, // Agregado
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.person, color: Colors.green),
                            SizedBox(width: 10),
                            Flexible(
                              // Agregado
                              child: Text(
                                "Profesional: $name",
                                style: TextStyle(
                                  fontSize: size.width * 0.055,
                                  fontWeight: FontWeight.bold,
                                  color: theme.textTheme.bodyLarge!.color,
                                ),
                                overflow: TextOverflow.ellipsis, // Agregado
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.location_on, color: Colors.green),
                            SizedBox(width: 10),
                            Flexible(
                              // Agregado
                              child: Text(
                                "Ubicación: $location",
                                style: TextStyle(
                                  fontSize: size.width * 0.055,
                                  fontWeight: FontWeight.bold,
                                  color: theme.textTheme.bodyLarge!.color,
                                ),
                                overflow: TextOverflow.ellipsis, // Agregado
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
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
