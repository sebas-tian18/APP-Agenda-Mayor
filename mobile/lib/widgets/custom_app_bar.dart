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
    final size = MediaQuery.of(context).size;

    // Define un tamaño base para el ícono en función del ancho de la pantalla
    final iconSize = size.width * 0.09;

    final unseenCount = citasProvider.citas
        .where((cita) => !citasProvider.vistas.contains(cita.idCita))
        .length;

    return AppBar(
      title: Text(
        title,
        style: TextStyle(
          color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
          fontSize: size.width * 0.05, // Ajusta el tamaño de la fuente
        ),
      ),
      backgroundColor:
          themeNotifier.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
      automaticallyImplyLeading: showBackButton,
      leading: showBackButton
          ? IconButton(
              icon: Icon(
                Icons.arrow_back,
                color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
                size: iconSize, // Aplica el tamaño del ícono
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          : IconButton(
              icon: Stack(
                children: [
                  Icon(
                    citasProvider.hasUnseenNotifications
                        ? Icons.notifications_active
                        : Icons.notifications,
                    color:
                        themeNotifier.isDarkMode ? Colors.white : Colors.black,
                    size: iconSize, // Aplica el tamaño del ícono
                  ),
                  if (unseenCount > 0)
                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 20,
                          minHeight: 20,
                        ),
                        child: Text(
                          unseenCount.toString(),
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: size.width *
                                0.03, // Ajusta el tamaño de la fuente
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
              onPressed: () {
                // Marca las notificaciones como vistas
                citasProvider.marcarNotificacionesComoVistas();

                // Navega a la pantalla de notificaciones
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => NotificationScreen(
                      appointments: citasProvider.citas,
                    ),
                  ),
                );
              },
              iconSize: iconSize, // Aplica el tamaño del ícono
            ),
      actions: [
        IconButton(
          icon: Icon(
            Icons.account_circle,
            color: themeNotifier.isDarkMode ? Colors.white : Colors.black,
            size: iconSize, // Aplica el tamaño del ícono
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
