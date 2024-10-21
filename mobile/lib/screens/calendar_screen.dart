import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:intl/intl.dart';
import 'package:mobile/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

  // Cargar las citas guardadas desde SharedPreferences
// Cargar las citas guardadas desde SharedPreferences
  Future<void> _loadAppointments() async {
    final prefs = await SharedPreferences.getInstance();

    // Obtener el id del usuario logueado, puedes cambiarlo según cómo almacenes el ID
    // final String userId = 'userID'; // Reemplaza esto con la obtención dinámica del ID

    // Cargar citas específicas para este usuario
    // final storedAppointments = prefs.getStringList('appointments_$userId') ?? [];

    final storedAppointments = prefs.getStringList('appointments') ?? [];

    List<Meeting> loadedMeetings = storedAppointments.map((appointment) {
      List<String> parts = appointment.split(';');

      if (parts.length == 5) {
        DateTime appointmentDate;
        try {
          appointmentDate = DateFormat('dd/MM/yyyy').parse(parts[1]);
          // Ajustar la hora (por ejemplo, si estás guardando la hora en UTC)
          // appointmentDate = appointmentDate.toUtc().add(Duration(hours: 3)); // Ajustar según sea necesario
        } catch (e) {
          appointmentDate =
              DateTime.now(); // Fecha por defecto en caso de error
        }
        return Meeting(
          parts[0], // Título de la cita (label)
          appointmentDate, // Fecha de inicio
          appointmentDate.add(const Duration(hours: 1)), // Duración de 1 hora
          const Color(0xFF0F8644), // Color de fondo
          false,
        );
      } else {
        return Meeting(
          'Cita inválida',
          DateTime.now(),
          DateTime.now().add(const Duration(hours: 1)),
          Colors.red,
          false,
        );
      }
    }).toList();

    setState(() {
      meetings = loadedMeetings;
    });
  }

  @override
  Widget build(BuildContext context) {
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
                    firstDayOfWeek: 1, // Lunes como primer día
                    dataSource: MeetingDataSource(meetings),
                    timeZone: 'America/Santiago',
                    timeSlotViewSettings: TimeSlotViewSettings(
                      dayFormat: 'EEE', // Mostrar días completos en español
                      startHour: 0,
                    ),
                  ),
                  // Vista de mes
                  SfCalendar(
                    view: CalendarView.month,
                    firstDayOfWeek: 1, // Lunes como primer día
                    dataSource: MeetingDataSource(meetings),
                    monthViewSettings: MonthViewSettings(
                      appointmentDisplayMode:
                          MonthAppointmentDisplayMode.appointment,
                      dayFormat: 'EEE', // Abreviación de días en español
                      showTrailingAndLeadingDates:
                          false, // Ocultar días fuera del mes actual
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
}
