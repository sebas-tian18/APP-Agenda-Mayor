import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Necesario para usar Consumer
import 'package:mobile/widgets/custom_app_bar.dart';
import 'package:mobile/providers/theme_notifier.dart';

class ConfiguationScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  ConfiguationScreen({super.key, this.fromNavigationMenu = true});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size; // Obtener tamaño de la pantalla

    return Scaffold(
      appBar: CustomAppBar(
        title: 'Configuración',
        showBackButton: fromNavigationMenu,
      ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
        alignment: Alignment.center,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Consumer<ThemeNotifier>(
              builder: (context, themeNotifier, child) {
                return IconButton(
                  icon: Icon(
                    themeNotifier.isDarkMode
                        ? Icons.wb_sunny
                        : Icons.nights_stay,
                  ),
                  onPressed: () {
                    themeNotifier.toggleTheme();
                  },
                  iconSize: size.width * 0.12,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
