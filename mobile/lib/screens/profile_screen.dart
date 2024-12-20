import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Importar Provider
import 'package:mobile/widgets/profile_list_item.dart';
import 'package:mobile/providers/auth_provider.dart'; // Importar para los datos y logout
import 'package:dio/dio.dart';

class ProfileScreen extends StatefulWidget {
  @override
  ProfileScreenState createState() => ProfileScreenState();
}

class ProfileScreenState extends State<ProfileScreen> {
  String nombreCompleto = '';
  String email = '';
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    if (authProvider.idUsuario != null) {
      fetchUserData(authProvider.idUsuario!);
    }
  }

  Future<void> fetchUserData(int id) async {
    try {
      final dio = Dio();
      final response = await dio.get('http://10.0.2.2:3000/api/usuarios/$id');

      final data = response.data;
      setState(() {
        nombreCompleto =
            "${data['nombre_usuario']} ${data['apellido_paterno']} ${data['apellido_materno']}";
        email = data['email'];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      print("Error al cargar los datos del usuario: $e");
    }
  }

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
                radius: size.width * 0.2, // Ajustar el tamaño del avatar
                child: Icon(
                  Icons.person,
                  size: size.width * 0.2, // Icono proporcionado al tamaño
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: size.height * 0.02),
        Text(
          nombreCompleto.isNotEmpty ? nombreCompleto : 'Nombre Usuario',
          style: TextStyle(
            fontSize: size.width * 0.05,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: size.height * 0.015),
        Text(
          email.isNotEmpty ? email : 'Correo no disponible',
          style: TextStyle(
            fontSize: size.width * 0.04,
            color: Colors.grey,
          ),
        ),
      ],
    );

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            profileInfo,
            ListView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              children: <Widget>[
                ProfileListItem(
                  icon: Icons.help_outline,
                  text: 'Acerca de',
                  onTap: () {
                    Navigator.pushNamed(context, '/ayuda-soporte');
                  },
                ),
                ProfileListItem(
                  icon: Icons.person,
                  text: 'Datos de Usuario',
                  onTap: () {
                    Navigator.pushNamed(
                        context, '/datos-perfil'); // Navegar a editar perfil
                  },
                ),
                ProfileListItem(
                  icon: Icons.history,
                  text: 'Historial de Citas',
                  onTap: () {
                    Navigator.pushNamed(context,
                        '/historial-citas'); // Navegar a historial de citas
                  },
                ),
                ProfileListItem(
                  icon: Icons.help_outline,
                  text: 'Ayuda y Soporte',
                  onTap: () {
                    Navigator.pushNamed(
                        context, '/ayuda-soporte'); // Navegar a ayuda y soporte
                  },
                ),
                ProfileListItem(
                  icon: Icons.settings,
                  text: 'Configuración',
                  onTap: () {
                    Navigator.pushNamed(
                        context, '/configuracion'); // Navegar a configuración
                  },
                ),
                ProfileListItem(
                  icon: Icons.logout,
                  text: 'Cerrar Sesión',
                  hasNavigation: false,
                  onTap: () {
                    showDialog(
                      context: context,
                      builder: (context) {
                        final size = MediaQuery.of(context)
                            .size; // Obtener tamaño de la pantalla

                        return Dialog(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                15.0), // Bordes redondeados
                          ),
                          child: Container(
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Text(
                                  'Cerrar Sesión',
                                  style: TextStyle(
                                    fontSize: size.width * 0.06,
                                    fontWeight: FontWeight.bold,
                                    color: Theme.of(context).primaryColor,
                                  ),
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  '¿Está seguro de que desea cerrar su sesión?',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(fontSize: size.width * 0.05),
                                ),
                                const SizedBox(height: 20),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Cerrar el diálogo
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors
                                            .grey, // Botón "Cancelar" gris
                                        padding: EdgeInsets.symmetric(
                                          horizontal: size.width * 0.1,
                                          vertical: size.height * 0.015,
                                        ),
                                      ),
                                      child: const Text(
                                        'Cancelar',
                                        style: TextStyle(color: Colors.white),
                                      ),
                                    ),
                                    ElevatedButton(
                                      onPressed: () async {
                                        Navigator.of(context)
                                            .pop(); // Cerrar el diálogo
                                        await Provider.of<AuthProvider>(context,
                                                listen: false)
                                            .logout(); // Cerrar sesión
                                        if (context.mounted) {
                                          Navigator.pushReplacementNamed(
                                              context, '/login');
                                        }
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor:
                                            Theme.of(context).primaryColor,
                                        padding: EdgeInsets.symmetric(
                                          horizontal: size.width * 0.1,
                                          vertical: size.height * 0.015,
                                        ),
                                      ),
                                      child: const Text(
                                        'Aceptar',
                                        style: TextStyle(color: Colors.white),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
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
