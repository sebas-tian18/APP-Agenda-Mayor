import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/colors.dart';
import 'appointment_screen.dart'; // Asegúrate de importar AppointmentScreen

class ServiceDetailScreen extends StatefulWidget {
  final String label;
  final List<Map<String, String>> predefinedAppointments; // Citas predefinidas

  ServiceDetailScreen(
      {required this.label, required this.predefinedAppointments});

  @override
  ServiceDetailScreenState createState() => ServiceDetailScreenState();
}

class ServiceDetailScreenState extends State<ServiceDetailScreen> {
  String? selectedPredefinedTimeSlot;

  Future<void> _saveAppointment() async {
    if (selectedPredefinedTimeSlot != null) {
      final prefs = await SharedPreferences.getInstance();

      // Obtener el id del usuario logueado, puedes cambiarlo según cómo almacenes el ID
      // final String userId = 'userID'; // Reemplaza esto con la obtención dinámica del ID

      final selectedAppointment = widget.predefinedAppointments.firstWhere(
          (appointment) =>
              '${appointment['date']};${appointment['time']}' ==
              selectedPredefinedTimeSlot);

      final appointmentString =
          '${widget.label};${selectedAppointment['date']};${selectedAppointment['time']};${selectedAppointment['name']};${selectedAppointment['location']}';

      // Cargar las citas específicas para este usuario
      // List<String>? appointments = prefs.getStringList('appointments_$userId') ?? [];
      List<String>? appointments = prefs.getStringList('appointments') ?? [];
      appointments.add(appointmentString);
      // await prefs.setStringList('appointments_$userId', appointments);
      await prefs.setStringList('appointments', appointments);

      if (!mounted) return;

      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: Text("Cita confirmada para ${widget.label}"),
          content: Text(
              "Has realizado una cita para el $selectedPredefinedTimeSlot"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context); // Cierra el diálogo
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        AppointmentScreen(), // Redirige a AppointmentScreen
                  ),
                );
              },
              child: const Text("OK"),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: Text(widget.label)),
      body: Container(
        margin: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: widget.predefinedAppointments.length,
                itemBuilder: (context, index) {
                  final appointment = widget.predefinedAppointments[index];
                  final isSelected = selectedPredefinedTimeSlot ==
                      '${appointment['date']};${appointment['time']}';

                  return Column(
                    children: [
                      InkWell(
                        onTap: () {
                          setState(() {
                            selectedPredefinedTimeSlot =
                                '${appointment['date']};${appointment['time']}';
                          });
                        },
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                            side: BorderSide(
                              color: theme.dividerColor,
                              width: 1,
                            ),
                          ),
                          elevation: 6,
                          color: isSelected
                              ? Colors.green[100]
                              : theme
                                  .cardColor, // Cambiar color si está seleccionado
                          child: Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ListTile(
                                  title: Text(
                                    '${appointment['name']}',
                                    style: TextStyle(
                                      fontSize: size.width * 0.070,
                                      fontWeight: FontWeight.bold,
                                      color: isSelected
                                          ? Colors.green
                                          : theme.textTheme.bodyLarge!.color,
                                    ),
                                  ),
                                ),
                                Divider(
                                    thickness: 4, color: theme.dividerColor),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Flexible(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          SizedBox(height: 10),
                                          Row(
                                            children: [
                                              Icon(Icons.calendar_today,
                                                  color: Colors.green),
                                              SizedBox(width: 10),
                                              Flexible(
                                                child: Text(
                                                  "Fecha: ${appointment['date']}",
                                                  style: TextStyle(
                                                    fontSize:
                                                        size.width * 0.055,
                                                    fontWeight: FontWeight.bold,
                                                    color: theme.textTheme
                                                        .bodyLarge!.color,
                                                  ),
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(height: 10),
                                          Row(
                                            children: [
                                              Icon(Icons.access_time,
                                                  color: Colors.green),
                                              SizedBox(width: 10),
                                              Flexible(
                                                child: Text(
                                                  "Hora: ${appointment['time']}",
                                                  style: TextStyle(
                                                    fontSize:
                                                        size.width * 0.055,
                                                    fontWeight: FontWeight.bold,
                                                    color: theme.textTheme
                                                        .bodyLarge!.color,
                                                  ),
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(height: 10),
                                          Row(
                                            children: [
                                              Icon(Icons.location_on,
                                                  color: Colors.green),
                                              SizedBox(width: 10),
                                              Flexible(
                                                child: Text(
                                                  "Ubicación: ${appointment['location']}",
                                                  style: TextStyle(
                                                    fontSize:
                                                        size.width * 0.055,
                                                    fontWeight: FontWeight.bold,
                                                    color: theme.textTheme
                                                        .bodyLarge!.color,
                                                  ),
                                                  overflow:
                                                      TextOverflow.ellipsis,
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
                      ),
                      SizedBox(height: 15),
                    ],
                  );
                },
              ),
            ),
            if (selectedPredefinedTimeSlot != null)
              Padding(
                padding: const EdgeInsets.all(10),
                child: Text(
                  'Has seleccionado: $selectedPredefinedTimeSlot',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ElevatedButton(
              onPressed: _saveAppointment,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryColor,
                padding:
                    const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
              ),
              child: const Text('Confirmar Cita',
                  style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
