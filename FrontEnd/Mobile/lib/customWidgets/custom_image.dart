import 'package:flutter/material.dart';

class CustomImage extends StatelessWidget {
  final String path;
  final double? height;
  final double? width;

  const CustomImage({
    super.key,
    required this.path,
    this.height,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return Image.network(
      'http://192.168.0.105:8000/api/image/$path',
      errorBuilder: (context, error, stackTrace) {
        return Text(error.toString());
      },
      height: height,
      width: width,
      headers: const {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/*; charset=UTF-8',
        'Accept': 'image/*',
        'Connection': 'Keep-Alive',
      },
    );
  }
}
