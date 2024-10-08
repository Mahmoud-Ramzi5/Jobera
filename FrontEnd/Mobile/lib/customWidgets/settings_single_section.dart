import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/texts.dart';

class SingleSection extends StatelessWidget {
  final String? title;
  final List<Widget> children;
  const SingleSection({
    super.key,
    this.title,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (title != null)
          Padding(
            padding: const EdgeInsets.all(10),
            child: SmallHeadlineText(text: title!),
          ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: children,
        ),
      ],
    );
  }
}
