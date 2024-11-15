import 'package:flutter/material.dart';
import 'package:mobile/services/appointment_service.dart';
import 'package:mobile/colors.dart';
import 'package:intl/intl.dart';

class ServiceDetailScreen extends StatefulWidget {
  final String label;
  final int serviceId;

  const ServiceDetailScreen(
      {required this.serviceId, required this.label, super.key});

  @override
  ServiceDetailScreenState createState() => ServiceDetailScreenState();
}

class ServiceDetailScreenState extends State<ServiceDetailScreen> {
  final AppointmentService _appointmentService = AppointmentService();
  late Future<List<dynamic>> _appointmentsFuture;
  String? _successMessage;
  int? selectedAppointment; // Variable para mantener la cita seleccionada

  @override
  void initState() {
    super.initState();
    _appointmentsFuture =
        _appointmentService.getAvailableAppointments(widget.serviceId);
  }

  // Función para agendar la cita
  void _bookAppointment(int appointmentId) async {
    try {
      await _appointmentService.bookAppointment(appointmentId, context);

      // Verificar si el widget sigue montado antes de actualizar el estado
      if (!mounted) return;

      setState(() {
        _successMessage = 'Cita agendada con éxito';
        // Actualizar la lista de citas después de agendar
        _appointmentsFuture =
            _appointmentService.getAvailableAppointments(widget.serviceId);
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error al agendar la cita: $e'),
        ));
      }
    }
  }

  // Función para mostrar el cuadro de diálogo de confirmación
  void _showConfirmationDialog(dynamic appointment) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          child: Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Confirmación de Cita',
                  style: TextStyle(
                    fontSize: size.width * 0.06,
                    fontWeight: FontWeight.bold,
                    color: theme.primaryColor,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Profesional: ${appointment['nombre_profesional']}',
                  style: TextStyle(fontSize: size.width * 0.05),
                ),
                SizedBox(height: 5),
                Text(
                  'Fecha: ${DateFormat('dd/MM/yyyy').format(DateTime.parse(appointment['fecha']))}',
                  style: TextStyle(fontSize: size.width * 0.05),
                ),
                SizedBox(height: 5),
                Text(
                  'Hora: ${appointment['hora_inicio']} - ${appointment['hora_termino']}',
                  style: TextStyle(fontSize: size.width * 0.05),
                ),
                SizedBox(height: 5),
                Text(
                  'Ubicación: ${appointment['nombre_tipo_servicio']}',
                  style: TextStyle(fontSize: size.width * 0.05),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey,
                      ),
                      child: const Text(
                        'Cancelar',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                        _bookAppointment(appointment); // Guardar la cita
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryColor,
                      ),
                      child: const Text(
                        'Confirmar',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.label),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _appointmentsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData && snapshot.data!.isEmpty) {
            return Center(
                child: Text(
                    'No hay citas disponibles')); // Mensaje para lista vacía
          }

          final appointments = snapshot.data!;

          return Column(
            children: [
              if (_successMessage != null)
                Text(
                  _successMessage!,
                  style: TextStyle(color: Colors.green),
                ),
              Expanded(
                child: ListView.builder(
                  itemCount: appointments.length,
                  itemBuilder: (context, index) {
                    final appointment = appointments[index];
                    final appointmentId = appointment['id_cita'];
                    bool isSelected = selectedAppointment == appointmentId;

                    return Column(
                      children: [
                        Container(
                          margin: EdgeInsets.only(
                              top: 15.0), // Aplica el margen superior aquí
                          child: InkWell(
                            onTap: () {
                              setState(() {
                                selectedAppointment = appointmentId;
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
                                  : theme.cardColor,
                              child: Padding(
                                padding: const EdgeInsets.all(15.0),
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    ListTile(
                                      title: Text(
                                        '${appointment['nombre_profesional']}',
                                        style: TextStyle(
                                          fontSize: size.width * 0.070,
                                          fontWeight: FontWeight.bold,
                                          color: isSelected
                                              ? Colors.green
                                              : theme
                                                  .textTheme.bodyLarge!.color,
                                        ),
                                      ),
                                    ),
                                    Divider(
                                        thickness: 4,
                                        color: theme.dividerColor),
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
                                                      "Fecha: ${DateFormat('dd/MM/yyyy').format(DateTime.parse(appointment['fecha']))}",
                                                      style: TextStyle(
                                                        fontSize:
                                                            size.width * 0.055,
                                                        fontWeight:
                                                            FontWeight.bold,
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
                                                      "Hora: ${appointment['hora_inicio']} - ${appointment['hora_termino']}",
                                                      style: TextStyle(
                                                        fontSize:
                                                            size.width * 0.055,
                                                        fontWeight:
                                                            FontWeight.bold,
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
                                                      "Ubicación: ${appointment['nombre_tipo_servicio']}",
                                                      style: TextStyle(
                                                        fontSize:
                                                            size.width * 0.055,
                                                        fontWeight:
                                                            FontWeight.bold,
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
                        ),
                        SizedBox(height: 15),
                      ],
                    );
                  },
                ),
              ),
              if (selectedAppointment != null)
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: Text(
                    'Has seleccionado: Cita $selectedAppointment',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ElevatedButton(
                onPressed: selectedAppointment != null
                    ? () {
                        final appointment = appointments.firstWhere(
                            (appt) => appt['id_cita'] == selectedAppointment);
                        _showConfirmationDialog(appointment);
                      }
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryColor,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                ),
                child: const Text('Confirmar Cita',
                    style: TextStyle(color: Colors.white, fontSize: 22)),
              ),
              SizedBox(height: 15),
            ],
          );
        },
      ),
    );
  }
}
