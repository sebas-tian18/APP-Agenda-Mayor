import 'package:flutter/material.dart';
import 'package:mobile/widgets/profile_list_item.dart';

class ProfileScreen extends StatefulWidget {
  @override
  ProfileScreenState createState() => ProfileScreenState();
}

class ProfileScreenState extends State<ProfileScreen> {
  bool isDarkMode = false; // Controla el estado del tema.

  void _toggleTheme() {
    setState(() {
      isDarkMode = !isDarkMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    // final double spacingUnit = MediaQuery.of(context).size.width / 20;

    var profileInfo = Column(
      children: <Widget>[
        Container(
          height: 150,
          width: 150,
          margin: EdgeInsets.only(top: 30),
          child: Stack(
            children: <Widget>[
              CircleAvatar(
                radius: 150,
                // colo: AssetImage('assets/images/),
              ),
              Align(
                alignment: Alignment.bottomRight,
                child: Container(
                  height: 50,
                  width: 50,
                  decoration: BoxDecoration(
                    color: Color(0xFF373737),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Icon(
                      Icons.edit,
                      color: Colors.black,
                      size: 30,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 15),
        Text(
          'Nombre Usuario',
          // style: f,
        ),
        SizedBox(height: 15),
        Text(
          'hola@gmail.com',
          // style:,
        ),
      ],
    );
    var header = Container(
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          profileInfo, // Información de perfil
          IconButton(
            icon: Icon(
              isDarkMode ? Icons.wb_sunny : Icons.nights_stay,
            ),
            onPressed: _toggleTheme,
            iconSize: 50,
          ),
        ],
      ),
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: isDarkMode ? ThemeData.dark() : ThemeData.light(),
      home: Scaffold(
        body: Column(
          children: <Widget>[
            header,
            Expanded(
              child: ListView(
                children: <Widget>[
                  ProfileListItem(
                    icon: Icons.history,
                    text: 'Historial de Citas',
                  ),
                  ProfileListItem(
                    icon: Icons.help_outline,
                    text: 'Ayuda y Soporte',
                  ),
                  ProfileListItem(
                    icon: Icons.settings,
                    text: 'Configuracion',
                  ),
                  ProfileListItem(
                    icon: Icons.logout,
                    text: 'Cerrar Sesión',
                    hasNavigation: false,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
