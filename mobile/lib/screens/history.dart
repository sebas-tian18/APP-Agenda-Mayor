import 'package:flutter/material.dart';
import 'package:mobile/providers/notification_controller.dart';

class HistoryScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  HistoryScreen({super.key, this.fromNavigationMenu = true});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Historial'),
        leading: fromNavigationMenu
            ? null
            : IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Navigator.pop(context),
              ),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            mostrarNotificacion(); // Llama a la función para mostrar notificaciones
          },
          child: const Text("Mostrar Notificación"),
        ),
      ),
    );
  }
}
