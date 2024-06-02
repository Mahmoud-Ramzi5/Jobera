import 'package:flutter/material.dart';

class CustomImage extends StatelessWidget {
  final String path;

  const CustomImage({super.key, required this.path});

  @override
  Widget build(BuildContext context) {
    return Image.network(
      path,
      errorBuilder: (context, error, stackTrace) {
        return Text(error.toString());
      },
      headers: const {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/*; charset=UTF-8',
        'Accept': 'image/*',
        'Connection': 'Keep-Alive',
      },
    );
  }
}
