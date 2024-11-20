import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/citas_provider.dart';
import 'package:mobile/screens/notification.dart';
import 'package:mobile/providers/theme_notifier.dart';

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
    final themeNotifier = Provider.of<ThemeNotifier>(context);

    // Determinar si hay notificaciones basadas en las citas
    final hasNotifications = citasProvider.citas.any((cita) {
      final now = DateTime.now();
      final oneWeekFromNow = now.add(const Duration(days: 7));
      return cita.fecha.isAfter(now) && cita.fecha.isBefore(oneWeekFromNow);
    });

    return AppBar(
      title: Text(
        title,
        style: TextStyle(
          color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
        ),
      ),
      backgroundColor:
          themeNotifier.isDarkMode ? Color(0xFF1E1E1E) : Colors.white,
      automaticallyImplyLeading: showBackButton,
      leading: showBackButton
          ? IconButton(
              icon: Icon(
                Icons.arrow_back,
                color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          : IconButton(
              icon: Icon(
                hasNotifications
                    ? Icons.notifications_active
                    : Icons.notifications,
                color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
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
          icon: Icon(
            Icons.account_circle,
            color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
          ),
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
