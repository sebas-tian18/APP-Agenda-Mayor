import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/widgets/tab_item.dart';
import 'package:intl/intl.dart';
import 'package:mobile/colors.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Establecer la localización en español
    Intl.defaultLocale = 'es_ES';

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        body: Column(
          children: [
            const SizedBox(height: 35),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Container(
                height: 60,
                margin: const EdgeInsets.symmetric(horizontal: 16),
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
                    dataSource: MeetingDataSource(_getDataSource()),
                    timeSlotViewSettings: TimeSlotViewSettings(
                      dayFormat: 'EEE', // Mostrar días completos en español
                    ),
                  ),
                  // Vista de mes
                  SfCalendar(
                    view: CalendarView.month,
                    firstDayOfWeek: 1, // Lunes como primer día
                    dataSource: MeetingDataSource(_getDataSource()),
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

  // Generar datos para el calendario
  List<Meeting> _getDataSource() {
    final List<Meeting> meetings = <Meeting>[];
    final DateTime today = DateTime.now();
    final DateTime startTime =
        DateTime(today.year, today.month, today.day, 9, 0, 0);
    final DateTime endTime = startTime.add(const Duration(hours: 2));
    meetings.add(Meeting(
        'peluquero', startTime, endTime, const Color(0xFF0F8644), false));
    return meetings;
  }
}

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

class Meeting {
  Meeting(this.eventName, this.from, this.to, this.background, this.isAllDay);

  String eventName;
  DateTime from;
  DateTime to;
  Color background;
  bool isAllDay;
}
