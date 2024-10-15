import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:mobile/widgets/tab_item.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
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
                  color: Colors.green.shade100,
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
                child: const TabBar(
                  indicatorSize: TabBarIndicatorSize.tab,
                  dividerColor: Colors.transparent,
                  indicator: BoxDecoration(
                    color: Colors.green,
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
                  SfCalendar(
                    view: CalendarView.week, // Vista semanal
                  ),
                  SfCalendar(
                    view: CalendarView.month, // Vista mensual
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
