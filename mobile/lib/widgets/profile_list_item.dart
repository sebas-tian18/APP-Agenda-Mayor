import 'package:flutter/material.dart';

class ProfileListItem extends StatelessWidget {
  final IconData? icon;
  final String? text;
  final bool hasNavigation;

  const ProfileListItem({
    super.key,
    this.icon,
    this.text,
    this.hasNavigation = true,
  });

  @override
  Widget build(BuildContext context) {
    const double spacingUnit = 10.0;
    const TextStyle titleTextStyle = TextStyle(
      fontSize: 16.0,
      fontWeight: FontWeight.w500,
    );

    return Container(
      height: spacingUnit * 5.5,
      margin: EdgeInsets.symmetric(
        horizontal: spacingUnit * 4,
      ).copyWith(
        bottom: spacingUnit * 2,
      ),
      padding: EdgeInsets.symmetric(
        horizontal: spacingUnit * 2,
      ),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(spacingUnit * 3),
          color: Colors.green),
      child: Row(
        children: <Widget>[
          if (icon != null) // Asegura que icon no sea nulo antes de mostrarlo
            Icon(
              icon,
              size: spacingUnit * 2.5,
            ),
          SizedBox(width: spacingUnit * 1.5),
          if (text != null)
            Text(
              text!,
              style: titleTextStyle,
            ),
          Spacer(),
          if (hasNavigation)
            Icon(
              Icons.arrow_forward_ios,
              size: spacingUnit * 2.5,
            ),
        ],
      ),
    );
  }
}
