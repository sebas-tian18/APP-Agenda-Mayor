import 'package:flutter/material.dart';
import 'package:mobile/paginas/login.dart';

void main() {
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
          scaffoldBackgroundColor: Colors.grey.shade200),
      home: LoginScreen(),
    );
  }
}
// pendiente 
// arregrar tamaño del boton del login , arreglors visuales al login,
// arreglos visuales a citas , arreglos al navbar 