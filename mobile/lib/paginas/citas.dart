import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CITAS'),
        backgroundColor: Colors.grey[300],
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle),
            onPressed: () {},
            color: Colors.black,
          ),
        ],
      ),
      body: Container(
        margin: const EdgeInsets.only(right: 20, left: 20),
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
        child: BottomAppBar(
          shape: CircularNotchedRectangle(),
          notchMargin: 15.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(
                icon: Icon(Icons.home, size: 40),
                onPressed: () {},
              ),
              IconButton(
                icon: Icon(Icons.calendar_today, size: 40),
                onPressed: () {},
              ),
              SizedBox(width: 40), // espacio para el FAB
              IconButton(
                icon: Icon(Icons.settings, size: 40),
                onPressed: () {},
              ),
              IconButton(
                icon: Icon(Icons.admin_panel_settings, size: 40),
                onPressed: () {},
              ),
            ],
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

class ServiceButton extends StatelessWidget {
  final IconData icon;
  final String label;

  ServiceButton({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.green,
        padding: EdgeInsets.all(20),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
      ),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 80, color: Colors.white),
          SizedBox(height: 10),
          Text(label, style: TextStyle(color: Colors.white, fontSize: 23)),
        ],
      ),
    );
  }
}
