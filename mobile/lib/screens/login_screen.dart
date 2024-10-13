import 'package:flutter/material.dart';
import 'package:mobile/widgets/navigation_bar.dart';
import 'package:mobile/services/auth_service.dart';

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
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          Column(
            children: [
              SizedBox(
                height: 400,
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
                    child: ListView(
                      padding: const EdgeInsets.only(
                        right: 40,
                        left: 40,
                      ),
                      children: [
                        const SizedBox(
                            height:
                                50), // Espacio reservado para el texto movido
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Color.fromARGB(255, 224, 224, 224),
                            boxShadow: [
                              BoxShadow(
                                offset: const Offset(0, 5),
                                blurRadius: 5,
                                spreadRadius: 1,
                                color: Colors.black.withOpacity(.1),
                              ),
                            ],
                          ),
                          child: TextField(
                            controller: _emailController, //controller
                            keyboardType: TextInputType.emailAddress,
                            autocorrect: false,
                            decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                filled: true,
                                labelText: "Correo",
                                hintStyle:
                                    TextStyle(fontWeight: FontWeight.w300),
                                prefixIcon: Icon(Icons.mail)),
                          ),
                        ),
                        const SizedBox(height: 30),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Color.fromARGB(255, 224, 224, 224),
                            boxShadow: [
                              BoxShadow(
                                offset: const Offset(0, 5),
                                blurRadius: 5,
                                spreadRadius: 1,
                                color: Colors.black.withOpacity(.1),
                              ),
                            ],
                          ),
                          child: TextField(
                            controller: _passwordController, //controller
                            obscureText: true,
                            decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                filled: true,
                                labelText: "Contraseña",
                                prefixIcon: Icon(Icons.lock)),
                          ),
                        ),
                        const SizedBox(height: 60),
                        loginButton(context), //contructor del boton
                      ],
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
