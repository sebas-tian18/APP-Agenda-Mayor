import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/colors.dart';

class ServiceDetailScreen extends StatefulWidget {
  final String label;

  ServiceDetailScreen({required this.label});

  @override
  ServiceDetailScreenState createState() => ServiceDetailScreenState();
}

class ServiceDetailScreenState extends State<ServiceDetailScreen> {
  // Slot de tiempo seleccionado
  int? selectedTimeSlot;

  // Fecha seleccionada
  DateTime? selectedDate;

  // Lista de slots de tiempo
  final List<String> timeSlots = [
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "12:00 PM",
    "12:15 PM",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.label)),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: SfCalendar(
              view: CalendarView.month,
              onTap: (CalendarTapDetails details) {
                if (details.targetElement == CalendarElement.calendarCell) {
                  setState(() {
                    selectedDate = details.date;
                  });
                }
              },
            ),
          ),
          if (selectedDate != null)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Text(
                "Selected Date: ${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          Expanded(
            child: GridView.count(
              crossAxisCount: 3,
              childAspectRatio: 3,
              padding: const EdgeInsets.all(10),
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              children: List.generate(timeSlots.length, (index) {
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedTimeSlot = index; // Seleccionar slot de tiempo
                    });
                  },
                  child: _buildTimeSlot(
                    timeSlots[index],
                    selectedTimeSlot == index,
                  ),
                );
              }),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: Column(
              children: [
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () {
                    if (selectedDate != null && selectedTimeSlot != null) {
                      showDialog(
                        context: context,
                        builder: (_) => AlertDialog(
                          title: Text("Cita confirmada para ${widget.label}"),
                          content: Text(
                            "Has realizado una cita para el ${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year} a las ${timeSlots[selectedTimeSlot!]}",
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text("OK"),
                            ),
                          ],
                        ),
                      );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryColor,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 15),
                  ),
                  child: const Text(
                    'Agregar datos',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimeSlot(String time, bool isSelected) {
    return Container(
      decoration: BoxDecoration(
        color: isSelected ? AppColors.primaryColor : Colors.grey[200],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Text(
          time,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.black,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }
}
