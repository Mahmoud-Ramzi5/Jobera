import 'package:flutter/material.dart';

class CustomLogoContainer extends StatelessWidget {
  final String imagePath;

  const CustomLogoContainer({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,
      decoration: ShapeDecoration(
          shape: const StadiumBorder(),
          gradient: LinearGradient(colors: [
            Colors.lightBlue.shade900,
            Colors.orange.shade800,
            Colors.cyan.shade200
          ])),
      child: Image.asset(imagePath),
    );
  }
}
