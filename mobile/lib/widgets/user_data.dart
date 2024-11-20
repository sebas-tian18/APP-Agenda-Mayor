import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Necesario para usar Consumer
import 'package:dio/dio.dart';
import 'package:intl/intl.dart'; // Importar para el manejo de fechas
import 'package:mobile/widgets/custom_app_bar.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/providers/theme_notifier.dart';

class DataScreen extends StatefulWidget {
  final bool fromNavigationMenu;

  DataScreen({super.key, this.fromNavigationMenu = true});

  @override
  DataScreenState createState() => DataScreenState();
}

class DataScreenState extends State<DataScreen> {
  Map<String, dynamic> userData = {};
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

      setState(() {
        userData = response.data;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      print("Error al cargar los datos del usuario: $e");
    }
  }

  String formatDate(String? isoDate) {
    if (isoDate == null || isoDate.isEmpty) {
      return 'No disponible';
    }
    try {
      final dateTime = DateTime.parse(isoDate);
      final formattedDate = DateFormat('dd/MM/yyyy').format(dateTime);
      return formattedDate;
    } catch (e) {
      return 'Formato inválido';
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Datos de Usuario',
        showBackButton: widget.fromNavigationMenu,
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : userData.isNotEmpty
              ? SingleChildScrollView(
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: size.width * 0.04,
                      vertical: size.height * 0.02,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        buildHeader(size),
                        SizedBox(height: size.height * 0.03),
                        buildUserCard(size),
                      ],
                    ),
                  ),
                )
              : Center(
                  child: Text(
                    'No se pudieron cargar los datos del usuario.',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
    );
  }

  Widget buildHeader(Size size) {
    return Center(
      child: Column(
        children: [
          CircleAvatar(
            radius: size.width * 0.2, // Ajustar el tamaño del avatar
            child: Icon(
              Icons.person,
              size: size.width * 0.2, // Icono proporcionado al tamaño
              color: Colors.white,
            ),
          ),
          SizedBox(height: size.height * 0.02),
        ],
      ),
    );
  }

  Widget buildUserCard(Size size) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    return Card(
      elevation: 3,
      color: themeNotifier.isDarkMode ? Color(0xFF1E1E1E) : Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: size.width * 0.04,
          vertical: size.height * 0.02,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            buildUserInfo('Rut',
                userData['rut_usuario']?.toString() ?? 'No disponible', size),
            buildUserInfo('Nombre', userData['nombre_usuario'], size),
            buildUserInfo(
                'Apellido Paterno', userData['apellido_paterno'], size),
            buildUserInfo(
                'Apellido Materno', userData['apellido_materno'], size),
            buildUserInfo('Correo Electrónico', userData['email'], size),
            buildUserInfo('Fecha de Nacimiento',
                formatDate(userData['fecha_nacimiento']), size),
            buildUserInfo(
                'Teléfono', userData['telefono'] ?? 'No disponible', size),
            buildUserInfo('Nacionalidad',
                userData['nacionalidad'] ?? 'No disponible', size),
            buildUserInfo('Sexo', userData['sexo'] ?? 'No especificado', size),
          ],
        ),
      ),
    );
  }

  Widget buildUserInfo(String label, String value, Size size) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: size.height * 0.01),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: size.width * 0.04,
              fontWeight: FontWeight.bold,
            ),
          ),
          Flexible(
            child: Text(
              value,
              style: TextStyle(
                fontSize: size.width * 0.04,
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.right,
            ),
          ),
        ],
      ),
    );
  }
}
