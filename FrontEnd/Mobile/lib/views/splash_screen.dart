import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/logo_container.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
        body: Center(
          child: Center(
            child: LogoContainer(imagePath: 'assets/JoberaLogo.png'),
          ),
        ),
      ),
    );
  }
}
