import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/citas_provider.dart';
import 'package:mobile/screens/notification.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showBackButton;

  const CustomAppBar({
    super.key,
    required this.title,
    this.showBackButton = false,
  });

  @override
  Widget build(BuildContext context) {
    final citasProvider = Provider.of<CitasProvider>(context);
    final hasNotifications = citasProvider.citas.any((cita) {
      final now = DateTime.now();
      final oneWeekFromNow = now.add(const Duration(days: 7));
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(oneWeekFromNow);
    });

    return AppBar(
      title: Text(
        title,
        style: const TextStyle(color: Colors.black),
      ),
      backgroundColor: Colors.white,
      automaticallyImplyLeading: showBackButton,
      leading: showBackButton
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          : IconButton(
              icon: Icon(
                hasNotifications
                    ? Icons.notifications_active
                    : Icons.notifications,
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => NotificationScreen(
                      appointments: citasProvider.citas,
                    ),
                  ),
                );
              },
            ),
      actions: [
        IconButton(
          icon: const Icon(Icons.account_circle),
          onPressed: () {
            // Acción para el botón de perfil
          },
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
