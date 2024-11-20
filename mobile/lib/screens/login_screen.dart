import 'package:flutter/material.dart';
import 'package:mobile/widgets/navigation_bar.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:provider/provider.dart'; // Para acceder a AuthProvider
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/widgets/login_design.dart';
import 'package:mobile/colors.dart';
import 'package:mobile/providers/theme_notifier.dart';

class LoginScreen extends StatefulWidget {
  @override
  LoginScreenState createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  bool _isLoading = false;

  final AuthService _authService = AuthService(); // Instancia de AuthService

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    // Limpiar controladores cuando se elimina el widget
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    setState(() {
      _isLoading = true; // Spinner de carga
    });

    try {
      AuthResponse authResponse = await _authService.userLogin(
          _emailController.text, _passwordController.text); // llamar a la API

      if (!mounted) return; // Verificar si el widget sigue montado

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text(authResponse.message)), //Mostrar el mensaje de error
      );

      if (authResponse.isAuthenticated) {
        // Llamar a cargarDatos en AuthProvider para actualizar el estado global
        await Provider.of<AuthProvider>(context, listen: false).cargarDatos();

        // Verificar si el widget sigue montado antes de usar context
        if (!mounted) return;

        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => NavigationMenu()),
        );
      }
    } catch (e) {
      if (!mounted) return;

      // Si hay error inesperado mostrar un mensaje
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Ocurrió un error: ${e.toString()}'),
        ),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final size = MediaQuery.of(context).size;
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          Column(
            children: [
              SizedBox(
                height: size.height * 0.4, // Hace el tamaño dinámico
                child: Stack(
                  children: [
                    Positioned(
                      left: -size.width * 0.3,
                      right: -size.width * 0.3,
                      child: Container(
                        width: double.infinity,
                        height: size.height * 0.4,
                        decoration: BoxDecoration(
                          color: themeNotifier.isDarkMode
                              ? AppColors
                                  .primaryColorDark // Color para el modo oscuro
                              : AppColors.primaryColor,
                          borderRadius: BorderRadius.only(
                            bottomLeft: Radius.circular(1000),
                            bottomRight: Radius.circular(1000),
                          ),
                        ),
                        child: Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                Theme.of(context)
                                    .colorScheme
                                    .primary
                                    .withOpacity(.3),
                                Theme.of(context)
                                    .colorScheme
                                    .primary
                                    .withOpacity(.3),
                              ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: const BorderRadius.only(
                              bottomLeft: Radius.circular(1000),
                              bottomRight: Radius.circular(1000),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(child: Container()),
            ],
          ),
          Positioned(
            top: size.height * 0.15,
            left: 0,
            right: 0,
            child: Text(
              'Bienvenido',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
              textAlign: TextAlign.center,
            ),
          ),
          Positioned(
            top: size.height * 0.35,
            left: 0,
            right: 0,
            bottom: size.height * 0.1,
            child: Column(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      // Cambia dinámicamente entre blanco y negro según el tema
                      color: themeNotifier.isDarkMode
                          ? Color(0xFF1E1E1E)
                          : Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          offset: const Offset(1, 1),
                          blurRadius: 3,
                          spreadRadius: 1,
                          // Ajusta el color de la sombra según el tema
                          color: themeNotifier.isDarkMode
                              ? Colors.white.withOpacity(0.5)
                              : Colors.black.withOpacity(0.5),
                        ),
                      ],
                    ),
                    width: size.width * 0.9,
                    padding: EdgeInsets.only(top: size.height * 0.02),
                    child: SingleChildScrollView(
                      padding:
                          EdgeInsets.symmetric(horizontal: size.width * 0.1),
                      child: Column(
                        children: [
                          SizedBox(height: size.height * 0.05),
                          CustomTextField(
                            controller: _emailController,
                            labelText: 'Correo',
                            icon: Icons.mail,
                            obscureText: false,
                            keyboardType: TextInputType.emailAddress,
                          ),
                          SizedBox(height: size.height * 0.03),
                          CustomTextField(
                            controller: _passwordController,
                            labelText: 'Contraseña',
                            icon: Icons.lock,
                            obscureText: true,
                          ),
                          SizedBox(height: size.height * 0.06),
                          loginButton(context),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget loginButton(BuildContext context) {
    return ElevatedButton(
      onPressed: _isLoading ? null : _login,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primaryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
      ),
      child: _isLoading
          ? const SizedBox(
              height: 20,
              width: 20,
              child: CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 2,
              ),
            )
          : const Text(
              'Iniciar Sesión',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
    );
  }
}
