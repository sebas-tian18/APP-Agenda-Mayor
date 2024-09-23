import 'package:flutter/material.dart';
import 'package:mobile/screens/login_screen.dart';
import 'package:mobile/widgets/service_button.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CITAS'),
        backgroundColor: Colors.grey[300],
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => LoginScreen()),
            );
          },
          color: Colors.black,
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle),
            onPressed: () {},
            color: Colors.black,
          ),
        ],
      ),
      body: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20),
        child: GridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
          children: [
            ServiceButton(icon: Icons.accessibility_new, label: 'Kinesiólogo'),
            ServiceButton(icon: Icons.content_cut, label: 'Peluquero'),
            ServiceButton(icon: Icons.local_hospital, label: 'Dentista'),
            ServiceButton(icon: Icons.gavel, label: 'Abogado'),
            ServiceButton(icon: Icons.psychology, label: 'Psicólogo'),
            ServiceButton(icon: Icons.description, label: 'Documentos'),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
          boxShadow: [
            BoxShadow(
              offset: const Offset(5, 1),
              blurRadius: 5,
              spreadRadius: 10,
              color: Colors.black.withOpacity(.5),
            ),
          ],
        ),
        child: SizedBox(
          height: 92,
          child: BottomAppBar(
            shape: CircularNotchedRectangle(),
            notchMargin: 15.0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.home, size: 30),
                        onPressed: () {},
                      ),
                      Text('Citas', style: TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.calendar_today, size: 30),
                        onPressed: () {},
                      ),
                      Text('Calendario', style: TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
                SizedBox(width: 40), // espacio para el FAB
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.book, size: 30),
                        onPressed: () {},
                      ),
                      Text('Administrar', style: TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.settings, size: 30),
                        onPressed: () {},
                      ),
                      Text('Ajustes', style: TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add, size: 40),
      ),
    );
  }
}
