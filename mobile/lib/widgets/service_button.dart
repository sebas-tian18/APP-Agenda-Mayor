import 'package:flutter/material.dart';
import 'package:mobile/colors.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/theme_notifier.dart';

class ServiceButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onPressed;

  ServiceButton({
    required this.icon,
    required this.label,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    return Container(
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            offset: const Offset(2, 2),
            blurRadius: 3,
            spreadRadius: 1,
            color: Colors.black.withOpacity(0.6),
          ),
        ],
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: themeNotifier.isDarkMode
              ? AppColors.primaryColorDark
              : AppColors.primaryColor,
          padding: EdgeInsets.all(20),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
        onPressed: onPressed,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 80, color: Colors.white),
            SizedBox(height: 10),
            Flexible(
              child: Text(
                label,
                style: TextStyle(color: Colors.white, fontSize: 20),
                textAlign: TextAlign.center,
                maxLines: 1, // Limitar el texto a una sola línea
                overflow: TextOverflow
                    .ellipsis, // Mostrar "..." si el texto es muy largo
              ),
            ),
          ],
        ),
      ),
    );
  }
}
