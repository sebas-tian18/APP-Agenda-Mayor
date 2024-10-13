import 'package:flutter/material.dart';
import 'package:mobile/widgets/service_button.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'CITAS'),
      body: Column(
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
                children: [
                  ServiceButton(
                      icon: Icons.accessibility_new, label: 'Kinesiólogo'),
                  ServiceButton(icon: Icons.content_cut, label: 'Peluquero'),
                  ServiceButton(icon: Icons.local_hospital, label: 'Dentista'),
                  ServiceButton(icon: Icons.gavel, label: 'Abogado'),
                  ServiceButton(icon: Icons.psychology, label: 'Psicólogo'),
                  ServiceButton(icon: Icons.description, label: 'Documento'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
