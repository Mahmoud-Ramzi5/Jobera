import 'package:flutter/material.dart';

class TitleText extends StatelessWidget {
  final String text;

  const TitleText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.titleLarge,
    );
  }
}

class BodyText extends StatelessWidget {
  final String? text;

  const BodyText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text!,
      style: Theme.of(context).textTheme.bodyLarge,
    );
  }
}

class LabelText extends StatelessWidget {
  final String text;

  const LabelText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.labelLarge,
    );
  }
}

class HeadlineText extends StatelessWidget {
  final String text;

  const HeadlineText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }
}
