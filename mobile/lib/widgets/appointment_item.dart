import 'package:flutter/material.dart';

class AppointmentItem extends StatelessWidget {
  final String title;
  final List<Map<String, String>> appointments;

  const AppointmentItem(
      {super.key, required this.title, required this.appointments});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20),
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.green,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  Text(
                    '${appointments.length} Citas',
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                ],
              ),
            ),
            SizedBox(height: 15),
            Expanded(
              child: ListView(
                children: appointments.map((appointment) {
                  return _appointmentTile(
                      appointment['title']!, appointment['date']!);
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _appointmentTile(String title, String date) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8),
      padding: EdgeInsets.all(12),
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
                color: Colors.green,
              ),
              SizedBox(width: 10),
              Text(title, style: TextStyle(fontSize: 16)),
            ],
          ),
          Text(date, style: TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}
