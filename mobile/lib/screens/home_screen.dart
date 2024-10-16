import 'package:flutter/material.dart';
import 'package:mobile/widgets/service_button.dart';
import 'package:mobile/widgets/custom_app_bar.dart';
import 'service_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'CITAS'),
      body: Column(
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
                clipBehavior: Clip
                    .none, // Permite que las sombras se extiendan fuera del GridView
                children: [
                  ServiceButton(
                    icon: Icons.accessibility_new,
                    label: 'Kinesiólogo',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Kinesiólogo',
                          ),
                        ),
                      );
                    },
                  ),
                  ServiceButton(
                    icon: Icons.content_cut,
                    label: 'Peluquero',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Peluquero',
                          ),
                        ),
                      );
                    },
                  ),
                  ServiceButton(
                    icon: Icons.local_hospital,
                    label: 'Dentista',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Dentista',
                          ),
                        ),
                      );
                    },
                  ),
                  ServiceButton(
                    icon: Icons.gavel,
                    label: 'Abogado',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Abogado',
                          ),
                        ),
                      );
                    },
                  ),
                  ServiceButton(
                    icon: Icons.psychology,
                    label: 'Psicólogo',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Psicólogo',
                          ),
                        ),
                      );
                    },
                  ),
                  ServiceButton(
                    icon: Icons.description,
                    label: 'Documento',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            label: 'Documento',
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
