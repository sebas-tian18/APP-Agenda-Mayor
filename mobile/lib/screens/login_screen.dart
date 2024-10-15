import 'package:flutter/material.dart';
import 'package:mobile/widgets/navigation_bar.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/widgets/login_design.dart';

class LoginScreen extends StatefulWidget {
  @override
  LoginScreenState createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  bool _isLoading = false;
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
      AuthResponse authResponse = await userLogin(
          _emailController.text, _passwordController.text); // llamar a la API

      if (!mounted) return; // Verificar si el widget sigue montado

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text(authResponse.message) //Mostrar el mensaje de error
            ),
      );

      if (authResponse.isAuthenticated) {
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
    return Scaffold(
      resizeToAvoidBottomInset:
          false, // Permite ajustar la vista cuando el teclado aparece
      body: Stack(
        children: [
          Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height *
                    0.4, // Hace el tamaño dinámico
                child: Stack(
                  children: [
                    Positioned(
                      left: -100,
                      right: -100,
                      child: Container(
                        width: double.infinity,
                        height: 400,
                        decoration: const BoxDecoration(
                          color: Colors.green,
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
            top: 150, // Ajusta la posicion vertical si es necesario
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
            top: 280, // Ajusta segun la nueva posicion del texto
            left: 0,
            right: 0,
            bottom: 100,
            child: Column(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          offset: const Offset(1, 1),
                          blurRadius: 3,
                          spreadRadius: 1,
                          color: Colors.black.withOpacity(.5),
                        ),
                      ],
                    ),
                    width: 350,
                    padding: const EdgeInsets.only(top: 20),
                    child: SingleChildScrollView(
                      // Uso de SingleChildScrollView para evitar problemas con el teclado
                      padding: const EdgeInsets.symmetric(horizontal: 40),
                      child: Column(
                        children: [
                          const SizedBox(height: 50),
                          CustomTextField(
                            controller:
                                _emailController, // referencia al controlador
                            labelText: 'Correo',
                            icon: Icons.mail,
                            obscureText: false,
                            keyboardType: TextInputType.emailAddress,
                          ),
                          const SizedBox(height: 30),
                          CustomTextField(
                            controller:
                                _passwordController, // referencia al controlador
                            labelText: 'Contraseña',
                            icon: Icons.lock,
                            obscureText: true,
                          ),
                          const SizedBox(height: 60),
                          loginButton(context), // Botón de login
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
        backgroundColor: Colors.green,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
      ),
      child: _isLoading
          ? const SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(
                strokeWidth: 4,
                color: Colors.white,
              ),
            )
          : const Text(
              'Ingresar',
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
              ),
            ),
    );
  }
}
