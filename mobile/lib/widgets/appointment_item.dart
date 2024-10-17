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
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                        color: Colors.white, fontSize: size.width * 0.05),
                  ),
                  Text(
                    '${appointments.length} Citas',
                    style: TextStyle(
                        color: Colors.white, fontSize: size.width * 0.05),
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.02),
            Expanded(
              child: ListView(
                children: appointments.map((appointment) {
                  return _appointmentTile(appointment['title']!,
                      appointment['date']!, appointment['time']!, size);
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _appointmentTile(String title, String date, String time, Size size) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: size.height * 0.01),
      padding: EdgeInsets.symmetric(
          vertical: size.height * 0.05, horizontal: size.width * 0.02),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(
                Icons.radio_button_checked,
                color: AppColors.primaryColor,
              ),
              SizedBox(width: size.width * 0.03),
              Text(title, style: TextStyle(fontSize: size.width * 0.045)),
            ],
          ),
          Column(
            children: [
              Text("Fecha: $date",
                  style: TextStyle(
                      fontSize: size.width * 0.045, color: Colors.black)),
              Text("Hora: $time",
                  style: TextStyle(
                      fontSize: size.width * 0.045, color: Colors.black)),
            ],
          ),
        ],
      ),
    );
  }
}
