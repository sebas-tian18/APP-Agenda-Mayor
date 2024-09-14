import 'package:flutter/material.dart';
import 'package:mobile/paginas/citas.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
            top: 150, // Ajusta la posición vertical si es necesario
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
            top: 250, // Ajusta según la nueva posición del texto
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
                          offset: const Offset(2, 2),
                          blurRadius: 5,
                          spreadRadius: 2,
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
                          padding: const EdgeInsets.symmetric(horizontal: 20),
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
                          child: const TextField(
                            decoration: InputDecoration(
                              hintText: "Usuario",
                              hintStyle: TextStyle(fontWeight: FontWeight.w300),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 30),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
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
                          child: const TextField(
                            decoration: InputDecoration(
                              hintText: "Email",
                              hintStyle: TextStyle(fontWeight: FontWeight.w300),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 60),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => HomeScreen()),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 50, vertical: 15),
                          ),
                          child: const Text(
                            'Ingresar',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
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
}
