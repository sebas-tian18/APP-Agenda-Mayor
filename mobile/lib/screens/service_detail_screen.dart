import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart'; // Necesario para inicializar la localización
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/colors.dart';

class ServiceDetailScreen extends StatefulWidget {
  final String label;

  ServiceDetailScreen({required this.label});

  @override
  ServiceDetailScreenState createState() => ServiceDetailScreenState();
}

class ServiceDetailScreenState extends State<ServiceDetailScreen> {
  int? selectedTimeSlot;
  DateTime? selectedDate;
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
  void initState() {
    super.initState();
    initializeDateFormatting('es_ES', null).then((_) {
      setState(() {});
    });
  }

  Future<void> _saveAppointment() async {
    if (selectedDate != null && selectedTimeSlot != null) {
      final prefs = await SharedPreferences.getInstance();

      // Formatear los datos de la cita
      final appointmentString =
          '${widget.label};${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year};${timeSlots[selectedTimeSlot!]}';

      // Obtener las citas actuales para el usuario
      List<String>? appointments = prefs.getStringList('appointments') ?? [];

      // Agregar la nueva cita
      appointments.add(appointmentString);

      // Guardar la lista actualizada de citas en SharedPreferences
      await prefs.setStringList('appointments', appointments);

      if (!mounted) return;

      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: Text("Cita confirmada para ${widget.label}"),
          content: Text(
            "Has realizado una cita para el ${DateFormat.MMMM('es_ES').format(selectedDate!)} a las ${timeSlots[selectedTimeSlot!]}",
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
  }

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
                "Fecha seleccionada: ${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}",
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
                return ElevatedButton(
                  onPressed: () {
                    setState(() {
                      selectedTimeSlot = index;
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: selectedTimeSlot == index
                        ? AppColors.primaryColor
                        : Colors.grey.shade100,
                  ),
                  child: Text(timeSlots[index]),
                );
              }),
            ),
          ),
          ElevatedButton(
            onPressed: _saveAppointment,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primaryColor,
              padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
            ),
            child: const Text(
              'Confirmar Cita',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
