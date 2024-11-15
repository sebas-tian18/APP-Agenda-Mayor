// Home_Screen
import 'package:flutter/material.dart';
import 'package:mobile/widgets/service_button.dart';
import 'package:mobile/widgets/custom_app_bar.dart';
import 'package:mobile/screens/service_detail_screen.dart'; // Importa la pantalla de citas

class HomeScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  HomeScreen({super.key, this.fromNavigationMenu = false});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'CITAS',
        showBackButton: fromNavigationMenu,
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
                clipBehavior: Clip.none,
                children: [
                  ServiceButton(
                    icon: Icons.accessibility_new,
                    label: 'Kinesiólogo',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ServiceDetailScreen(
                            serviceId: 3,
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
                            serviceId: 2,
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
                            serviceId: 1,
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
                            serviceId: 4,
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
                            serviceId: 5,
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
                            serviceId: 6,
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
