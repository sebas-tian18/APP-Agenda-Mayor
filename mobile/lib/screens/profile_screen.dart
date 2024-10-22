import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Importar Provider
import 'package:mobile/widgets/theme_notifier.dart'; // Importar el ThemeNotifier
import 'package:mobile/widgets/profile_list_item.dart';
import 'package:mobile/services/auth_service.dart';

class ProfileScreen extends StatelessWidget {
  final AuthService _authService = AuthService(); // Instancia de AuthService

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    var profileInfo = Column(
      children: <Widget>[
        Container(
          height: size.height * 0.2,
          width: size.width * 0.4,
          margin: EdgeInsets.only(top: size.height * 0.08),
          child: Stack(
            children: <Widget>[
              CircleAvatar(
                radius: size.width * 0.2,
                // backgroundImage: AssetImage('assets/images/profile.jpg'),
              ),
              Align(
                alignment: Alignment.bottomRight,
                child: Container(
                  height: size.height * 0.06,
                  width: size.width * 0.12,
                  decoration: BoxDecoration(
                    color: const Color(0xFF373737),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Icon(
                      Icons.edit,
                      color: Colors.white,
                      size: size.width * 0.07,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: size.height * 0.02),
        Text(
          'Nombre Usuario',
          style: TextStyle(
            fontSize: size.width * 0.05,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: size.height * 0.015),
        Text(
          'hola@gmail.com',
          style: TextStyle(
            fontSize: size.width * 0.04,
            color: Colors.grey,
          ),
        ),
      ],
    );

    var header = Container(
      padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          profileInfo,
          Consumer<ThemeNotifier>(
            builder: (context, themeNotifier, child) {
              return IconButton(
                icon: Icon(
                  themeNotifier.isDarkMode ? Icons.wb_sunny : Icons.nights_stay,
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
    );

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            header,
            ListView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              children: <Widget>[
                ProfileListItem(
                  icon: Icons.history,
                  text: 'Historial de Citas',
                ),
                ProfileListItem(
                  icon: Icons.help_outline,
                  text: 'Ayuda y Soporte',
                ),
                ProfileListItem(
                  icon: Icons.settings,
                  text: 'Configuración',
                ),
                ProfileListItem(
                  icon: Icons.logout,
                  text: 'Cerrar Sesión',
                  hasNavigation: false,
                  onTap: () async {
                    await _authService
                        .userLogout(); // Llamar a la función de cierre de sesión

                    // Verificar si el contexto sigue montado
                    if (context.mounted) {
                      Navigator.pushReplacementNamed(context,
                          '/login'); // Redirigir a la pantalla de login
                    }
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
