import 'package:flutter/material.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Ajustes'),
      body: Center(
        child: Text('pantalla de ajustes'),
      ),
    );
  }
}
