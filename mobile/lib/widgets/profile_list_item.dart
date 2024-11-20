import 'package:flutter/material.dart';
import 'package:mobile/colors.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/theme_notifier.dart';

class ProfileListItem extends StatelessWidget {
  final IconData? icon;
  final String? text;
  final bool hasNavigation;
  final VoidCallback? onTap;

  const ProfileListItem({
    super.key,
    this.icon,
    this.text,
    this.hasNavigation = true,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final size = MediaQuery.of(context).size;

    const TextStyle titleTextStyle = TextStyle(
      fontSize: 16.0,
      fontWeight: FontWeight.w500,
      color: Colors.white,
    );

    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: size.height * 0.08,
        margin: EdgeInsets.symmetric(horizontal: size.width * 0.1).copyWith(
          bottom: size.height * 0.03,
        ),
        padding: EdgeInsets.symmetric(horizontal: size.width * 0.05),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          color: themeNotifier.isDarkMode
              ? AppColors.primaryColorDark
              : AppColors.primaryColor,
        ),
        child: Row(
          children: <Widget>[
            if (icon != null)
              Icon(
                icon,
                size: size.width * 0.08,
              ),
            SizedBox(width: size.width * 0.07),
            if (text != null)
              Text(
                text!,
                style: titleTextStyle.copyWith(fontSize: size.width * 0.045),
              ),
            Spacer(),
            if (hasNavigation)
              Icon(
                Icons.arrow_forward_ios,
                size: size.width * 0.08,
              ),
          ],
        ),
      ),
    );
  }
}
