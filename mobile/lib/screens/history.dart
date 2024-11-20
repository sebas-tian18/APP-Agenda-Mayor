import 'package:flutter/material.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class HistoryScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  HistoryScreen({super.key, this.fromNavigationMenu = true});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'historial',
        showBackButton: fromNavigationMenu,
      ),
      body: Column(),
    );
  }
}
