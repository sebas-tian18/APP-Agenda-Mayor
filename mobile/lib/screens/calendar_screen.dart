import 'package:flutter/material.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class CalendarScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Calendario'),
      body: Center(
        child: Text('Contenido del Calendario'),
      ),
    );
  }
}
