import 'package:flutter/material.dart';
import 'package:mobile/widgets/service_button.dart';
import 'package:mobile/widgets/custom_app_bar.dart';
import 'service_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  HomeScreen({super.key, this.fromNavigationMenu = false});

  // Mapa de citas predefinidas por servicio
  final Map<String, List<Map<String, String>>> predefinedAppointmentsByService =
      {
    'Kinesiólogo': [
      {
        'date': '20/10/2024',
        'time': '10:00 AM',
        'name': 'Victor Gonzalez',
        'location': 'Temuco, Chile'
      },
      {
        'date': '21/10/2024',
        'time': '11:30 AM',
        'name': 'Tomaz Morales',
        'location': 'Temuco, Chile'
      },
      {
        'date': '22/10/2024',
        'time': '01:00 PM',
        'name': 'Ana Fernández',
        'location': 'Santiago, Chile'
      },
    ],
    'Peluquero': [
      {
        'date': '23/10/2024',
        'time': '09:00 AM',
        'name': 'Carlos Soto',
        'location': 'Valparaíso, Chile'
      },
      {
        'date': '24/10/2024',
        'time': '10:30 AM',
        'name': 'Maria Perez',
        'location': 'Concepción, Chile'
      },
      {
        'date': '25/10/2024',
        'time': '12:00 PM',
        'name': 'Jorge Lira',
        'location': 'La Serena, Chile'
      },
    ],
    'Dentista': [
      {
        'date': '26/10/2024',
        'time': '08:00 AM',
        'name': 'Roberto Diaz',
        'location': 'Puerto Montt, Chile'
      },
      {
        'date': '27/10/2024',
        'time': '09:30 AM',
        'name': 'Carolina López',
        'location': 'Rancagua, Chile'
      },
      {
        'date': '28/10/2024',
        'time': '11:00 AM',
        'name': 'Pedro Rivas',
        'location': 'Iquique, Chile'
      },
    ],
    'Abogado': [
      {
        'date': '19/10/2024',
        'time': '10:00 AM',
        'name': 'Luis Hernández',
        'location': 'Antofagasta, Chile'
      },
      {
        'date': '30/10/2024',
        'time': '12:00 PM',
        'name': 'Raul Martinez',
        'location': 'Arica, Chile'
      },
      {
        'date': '31/10/2024',
        'time': '02:00 PM',
        'name': 'Josefa Castillo',
        'location': 'Punta Arenas, Chile'
      },
    ],
    'Psicólogo': [
      {
        'date': '01/11/2024',
        'time': '09:00 AM',
        'name': 'Esteban Paredes',
        'location': 'Osorno, Chile'
      },
      {
        'date': '02/11/2024',
        'time': '11:00 AM',
        'name': 'Sandra Reyes',
        'location': 'Chillán, Chile'
      },
      {
        'date': '03/11/2024',
        'time': '01:00 PM',
        'name': 'Fernando Fuentes',
        'location': 'Calama, Chile'
      },
    ],
    'Documento': [
      {
        'date': '04/11/2024',
        'time': '08:00 AM',
        'name': 'Paula Morales',
        'location': 'La Serena, Chile'
      },
      {
        'date': '05/11/2024',
        'time': '10:00 AM',
        'name': 'Hector Nuñez',
        'location': 'Copiapó, Chile'
      },
      {
        'date': '06/11/2024',
        'time': '12:00 PM',
        'name': 'Camila Vargas',
        'location': 'Valdivia, Chile'
      },
    ],
  };

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
                            label: 'Kinesiólogo',
                            predefinedAppointments:
                                predefinedAppointmentsByService['Kinesiólogo']!,
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
                            predefinedAppointments:
                                predefinedAppointmentsByService['Peluquero']!,
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
                            predefinedAppointments:
                                predefinedAppointmentsByService['Dentista']!,
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
                            predefinedAppointments:
                                predefinedAppointmentsByService['Abogado']!,
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
                            predefinedAppointments:
                                predefinedAppointmentsByService['Psicólogo']!,
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
                            predefinedAppointments:
                                predefinedAppointmentsByService['Documento']!,
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
