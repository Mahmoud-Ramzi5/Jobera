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
  final String text;
  final TextOverflow? textOverflow;

  const BodyText({super.key, required this.text, this.textOverflow});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.bodyLarge,
      overflow: textOverflow,
    );
  }
}

class LabelText extends StatelessWidget {
  final String text;
  final TextDirection? textDirection;

  const LabelText({super.key, required this.text, this.textDirection});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.labelLarge,
      textDirection: textDirection,
    );
  }
}

class LargeHeadlineText extends StatelessWidget {
  final String text;

  const LargeHeadlineText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.headlineLarge,
    );
  }
}

class MediumHeadlineText extends StatelessWidget {
  final String text;

  const MediumHeadlineText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.headlineMedium,
    );
  }
}

class SmallHeadlineText extends StatelessWidget {
  final String text;

  const SmallHeadlineText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }
}
