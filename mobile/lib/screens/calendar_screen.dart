import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:intl/intl.dart';
import 'package:mobile/colors.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/citas_provider.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/providers/theme_notifier.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  CalendarScreenState createState() => CalendarScreenState();
}

class CalendarScreenState extends State<CalendarScreen> {
  List<Meeting> meetings = [];

  @override
  void initState() {
    super.initState();
    _loadAppointments(); // Cargar las citas guardadas al iniciar
  }

  // Cargar citas desde el provider
  Future<void> _loadAppointments() async {
    final citasProvider = Provider.of<CitasProvider>(context, listen: false);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    if (authProvider.idUsuario != null) {
      // Obtener citas a través del provider
      await citasProvider.cargarCitasPorUsuario(authProvider.idUsuario!);

      // Convertir las citas a la lista de Meeting
      List<Meeting> loadedMeetings = citasProvider.citas.map((cita) {
        // Parsear horaInicio y horaTermino como DateTime
        final DateTime fechaInicio = DateTime(
          cita.fecha.year,
          cita.fecha.month,
          cita.fecha.day,
          int.parse(cita.horaInicio.split(":")[0]), // Hora de inicio
          int.parse(cita.horaInicio.split(":")[1]), // Minuto de inicio
        );

        final DateTime fechaTermino = DateTime(
          cita.fecha.year,
          cita.fecha.month,
          cita.fecha.day,
          int.parse(cita.horaTermino.split(":")[0]), // Hora de término
          int.parse(cita.horaTermino.split(":")[1]), // Minuto de término
        );

        return Meeting(
          cita.nombreProfesional, // Título de la cita
          fechaInicio, // Fecha y hora de inicio
          fechaTermino, // Fecha y hora de término
          const Color(0xFF0F8644), // Color de fondo
          false, // No es una cita de día completo
        );
      }).toList();

      print(loadedMeetings);

      setState(() {
        meetings = loadedMeetings;
      });
    } else {
      // Manejo de error si el ID del usuario no está disponible
      print('Error: ID de usuario no disponible');
    }
  }

  // Función para mostrar detalles de la cita en un diálogo
  void mostrarDetallesCita(BuildContext context, List<dynamic> citas) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Detalles de la Cita"),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: citas.map((appointment) {
              final Meeting meeting = appointment;
              return ListTile(
                title: Text(meeting.eventName),
                subtitle: Text(
                  'Desde: ${DateFormat('dd/MM/yyyy HH:mm').format(meeting.from)}\n'
                  'Hasta: ${DateFormat('dd/MM/yyyy HH:mm').format(meeting.to)}',
                ),
              );
            }).toList(),
          ),
          actions: [
            TextButton(
              child: const Text("Cerrar"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final size = MediaQuery.of(context).size;
    // Establecer la localización en español
    Intl.defaultLocale = 'es_ES';

    return DefaultTabController(
      length: 2,
      initialIndex: 1,
      child: Scaffold(
        body: Column(
          children: [
            const SizedBox(height: 35),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Container(
                height: size.height * 0.08,
                margin: EdgeInsets.symmetric(horizontal: size.width * 0.04),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: AppColors.secondaryColor,
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
                child: TabBar(
                  indicatorSize: TabBarIndicatorSize.tab,
                  dividerColor: Colors.transparent,
                  indicator: BoxDecoration(
                    color: themeNotifier.isDarkMode
                        ? AppColors
                            .primaryColorDark // Color para el modo oscuro
                        : AppColors.primaryColor, // Color para el modo claro
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: Colors.black54,
                  tabs: [
                    TabItem(title: 'Semanas'),
                    TabItem(title: 'Meses'),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TabBarView(
                children: [
                  // Vista de semana
                  SfCalendar(
                    view: CalendarView.week,
                    firstDayOfWeek: 1,
                    dataSource: MeetingDataSource(meetings),
                    timeZone: 'America/Santiago',
                    onTap: (CalendarTapDetails details) {
                      if (details.appointments != null &&
                          details.appointments!.isNotEmpty) {
                        mostrarDetallesCita(context, details.appointments!);
                      }
                    },
                    timeSlotViewSettings: TimeSlotViewSettings(
                      dayFormat: 'EEE',
                      startHour: 8,
                      endHour: 24,
                      timeInterval: const Duration(minutes: 30),
                      timeFormat: 'HH:mm',
                    ),
                  ),
                  // Vista de mes
                  SfCalendar(
                    view: CalendarView.month,
                    firstDayOfWeek: 1,
                    dataSource: MeetingDataSource(meetings),
                    onTap: (CalendarTapDetails details) {
                      if (details.appointments != null &&
                          details.appointments!.isNotEmpty) {
                        mostrarDetallesCita(context, details.appointments!);
                      }
                    },
                    monthViewSettings: MonthViewSettings(
                      appointmentDisplayMode:
                          MonthAppointmentDisplayMode.appointment,
                      agendaViewHeight: 150,
                      showTrailingAndLeadingDates: false,
                    ),
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

// Modelo de citas (Meetings)
class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Meeting> source) {
    appointments = source;
  }

  @override
  DateTime getStartTime(int index) {
    return appointments![index].from;
  }

  @override
  DateTime getEndTime(int index) {
    return appointments![index].to;
  }

  @override
  String getSubject(int index) {
    return appointments![index].eventName;
  }

  @override
  Color getColor(int index) {
    return appointments![index].background;
  }

  @override
  bool isAllDay(int index) {
    return appointments![index].isAllDay;
  }
}

// Clase para representar una cita (Meeting)
class Meeting {
  Meeting(this.eventName, this.from, this.to, this.background, this.isAllDay);

  String eventName;
  DateTime from;
  DateTime to;
  Color background;
  bool isAllDay;

  // Sobrecargar el método toString() para mostrar información útil al imprimir
  @override
  String toString() {
    return 'Meeting(eventName: $eventName, from: $from, to: $to, isAllDay: $isAllDay)';
  }
}
