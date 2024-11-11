import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Importar Provider
import 'package:mobile/providers/theme_notifier.dart'; // Importar el ThemeNotifier

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showBackButton; // Controla si se muestra la campana o la flecha

  const CustomAppBar(
      {super.key, required this.title, this.showBackButton = false});

  @override
  Widget build(BuildContext context) {
    final themeNotifier =
        Provider.of<ThemeNotifier>(context); // Obtener el estado del tema
    return AppBar(
      title: Text(title),
      backgroundColor: themeNotifier.isDarkMode // Cambiar color dinámicamente
          ? Colors.grey.shade900
          : Colors.grey.shade300,
      automaticallyImplyLeading:
          showBackButton, // Muestra el botón de retroceso si está habilitado
      leading: showBackButton
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () {
                Navigator.pop(context); // Navegar hacia atrás
              },
              color: Colors.black,
            )
          : IconButton(
              icon: const Icon(Icons
                  .notifications), // Muestra la campana si no hay botón de retroceso
              onPressed: () {
                // Acciones para la campana
              },
              color: Colors.black,
            ),
      actions: [
        IconButton(
          icon: const Icon(Icons.account_circle),
          onPressed: () {},
          color: Colors.black,
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
