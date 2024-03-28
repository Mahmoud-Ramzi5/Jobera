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
          gradient: LinearGradient(
            colors: [
              Colors.lightBlue.shade900,
              Colors.orange.shade800,
              Colors.cyan,
            ],
          ),
          shadows: const [
            BoxShadow(
              color: Colors.cyan,
              blurRadius: 40,
              blurStyle: BlurStyle.outer,
            )
          ]),
      child: Image.asset(imagePath),
    );
  }
}
