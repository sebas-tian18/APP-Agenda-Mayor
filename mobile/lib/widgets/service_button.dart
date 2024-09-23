import 'package:flutter/material.dart';

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
