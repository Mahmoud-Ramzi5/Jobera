import 'package:flutter/material.dart';

class CustomTitleText extends StatelessWidget {
  final String text;

  const CustomTitleText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.titleLarge,
    );
  }
}

class CustomBodyText extends StatelessWidget {
  final String text;

  const CustomBodyText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.bodyLarge,
    );
  }
}

class CustomLabelText extends StatelessWidget {
  final String text;

  const CustomLabelText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.labelLarge,
    );
  }
}
