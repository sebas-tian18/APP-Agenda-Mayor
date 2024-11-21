import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/theme_notifier.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/providers/citas_provider.dart';
import 'package:mobile/screens/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Inicialización del framework

  // Fijar la orientación a vertical
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp, // Solo orientación vertical normal
  ]);

  Intl.defaultLocale = 'es_ES'; // Configura el idioma por defecto
  await initializeDateFormatting('es_ES', null); // Carga datos del idioma

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CitasProvider()),
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
                ? Color(0xFF121212)
                : Colors.grey.shade200,
          ),
          locale: const Locale('es', 'ES'), // Establece el idioma español
          supportedLocales: const [
            Locale('es', 'ES'), // Español
          ],
          localizationsDelegates: [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          home: LoginScreen(), // Al entrar se muestra el login
        );
      },
    );
  }
}
