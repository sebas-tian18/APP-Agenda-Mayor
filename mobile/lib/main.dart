import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Importar intl para manejo de fechas
// import 'package:mobile/screens/login_screen.dart';
import 'package:mobile/widgets/navigation_bar.dart';

void main() {
  // Configurar la localización a español antes de correr la app
  Intl.defaultLocale = 'es_ES'; // Configura el idioma a español
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF012e26)),
        useMaterial3: true,
        scaffoldBackgroundColor: Colors.grey.shade200,
      ),
      //   home: LoginScreen(),
      home: NavigationMenu(),
    );
  }
}
