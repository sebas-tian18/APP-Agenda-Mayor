import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/theme_notifier.dart'; // Estado global de tema
import 'package:mobile/providers/auth_provider.dart'; // Estado global de autenticacion
import 'package:mobile/screens/login_screen.dart'; // Importar screen de inicio

void main() {
  Intl.defaultLocale = 'es_ES'; // Configura el idioma a español
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..cargarDatos()),
        ChangeNotifierProvider(create: (_) => ThemeNotifier()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeNotifier>(
      builder: (context, themeNotifier, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            colorScheme: themeNotifier.isDarkMode
                ? ColorScheme.dark(
                    primary: const Color(0xFF4CAF50),
                    secondary: Colors.green.shade100,
                  )
                : ColorScheme.light(
                    primary: const Color(0xFF4CAF50),
                    secondary: Colors.green.shade100,
                  ),
            textTheme: TextTheme(
              bodyLarge: TextStyle(
                color: themeNotifier.isDarkMode ? Colors.grey : Colors.black,
              ),
            ),
            scaffoldBackgroundColor: themeNotifier.isDarkMode
                ? Colors.black87
                : Colors.grey.shade200,
          ),
          home: LoginScreen(), // Al entrar se muestra el login
          routes: {
            '/login': (context) => LoginScreen(), // Registrar la ruta /login
          },
        );
      },
    );
  }
}
