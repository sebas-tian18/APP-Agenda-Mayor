import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Necesario para usar Consumer
import 'package:mobile/widgets/custom_app_bar.dart';
import 'package:mobile/widgets/profile_list_item.dart';
import 'package:mobile/providers/theme_notifier.dart';
import 'package:mobile/colors.dart';

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
      body: Column(
        children: [
          // Espacio para centrar el icono
          Expanded(
            flex: 1,
            child: Center(
              child: Consumer<ThemeNotifier>(
                builder: (context, themeNotifier, child) {
                  return Container(
                    decoration: BoxDecoration(
                      color: themeNotifier.isDarkMode
                          ? AppColors.primaryColorDark
                          : AppColors.primaryColor,
                      borderRadius:
                          BorderRadius.circular(20), // Bordes redondeados
                    ),
                    child: IconButton(
                      icon: Icon(
                        themeNotifier.isDarkMode
                            ? Icons.wb_sunny
                            : Icons.nights_stay,
                        color: Colors.white, // Color del ícono
                      ),
                      onPressed: () {
                        themeNotifier.toggleTheme();
                      },
                      iconSize: size.width * 0.25, // Tamaño del ícono
                    ),
                  );
                },
              ),
            ),
          ),
          // Lista de opciones
          Expanded(
            flex: 2,
            child: ListView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              children: <Widget>[
                ProfileListItem(
                  icon: Icons.person,
                  text: 'Editar Perfil',
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      '/editar-perfil',
                    ); // Navegar a editar perfil
                  },
                ),
                // Agregar más opciones si es necesario
              ],
            ),
          ),
        ],
      ),
    );
  }
}
