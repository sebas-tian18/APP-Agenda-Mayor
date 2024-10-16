import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/appointment_screen.dart';
import 'package:mobile/screens/calendar_screen.dart';
import 'package:mobile/screens/profile_screen.dart';
import 'package:mobile/colors.dart';

class NavigationMenu extends StatelessWidget {
  const NavigationMenu({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(NavigationController());

    return Scaffold(
      bottomNavigationBar: Obx(
        () => Container(
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.4),
                spreadRadius: 1,
                blurRadius: 1,
                offset: Offset(0, -2),
              ),
            ],
          ),
          child: NavigationBar(
            height: 90,
            elevation: 0,
            backgroundColor: Colors.grey.shade300,
            selectedIndex: controller.selectedIndex.value,
            onDestinationSelected: (index) =>
                controller.selectedIndex.value = index,
            destinations: [
              NavigationDestination(
                icon: Icon(Icons.home, size: 40),
                label: 'Home',
              ),
              NavigationDestination(
                icon: Icon(Icons.calendar_today, size: 40),
                label: 'Calendario',
              ),
              IconButton(
                icon: const Icon(Icons.add_circle_outlined, size: 65),
                color: AppColors.primaryColor,
                onPressed: () {},
              ),
              NavigationDestination(
                icon: Icon(Icons.book, size: 40),
                label: 'Administrar',
              ),
              NavigationDestination(
                icon: Icon(Icons.person_outline, size: 40),
                label: 'Perfil',
              ),
            ],
          ),
        ),
      ),
      body: Obx(() => controller.screens[controller.selectedIndex.value]),
    );
  }
}

class NavigationController extends GetxController {
  final RxInt selectedIndex = 0.obs;

  final List<Widget> screens = [
    HomeScreen(),
    CalendarScreen(),
    Container(color: Colors.orange),
    AppointmentScreen(),
    ProfileScreen(),
  ];
}
