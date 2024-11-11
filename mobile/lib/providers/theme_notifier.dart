import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeNotifier extends ChangeNotifier {
  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  ThemeNotifier() {
    _loadThemeFromPreferences();
  }

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    _saveThemeToPreferences();
    notifyListeners();
  }

  void _loadThemeFromPreferences() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('isDarkMode') ?? false;
    notifyListeners();
  }

  void _saveThemeToPreferences() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('isDarkMode', _isDarkMode);
  }
}
