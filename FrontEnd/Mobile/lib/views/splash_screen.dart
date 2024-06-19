import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
        child: Scaffold(
      body: Center(
        child: LogoContainer(imagePath: 'assets/JoberaLogo.png'),
      ),
    ));
  }
}
