import 'package:flutter/material.dart';

class CustomDateContainer extends StatelessWidget {
  final Widget widget;

  const CustomDateContainer({super.key, required this.widget});

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(5),
        margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
        decoration: ShapeDecoration(
          shape: StadiumBorder(
            side: BorderSide(color: Colors.orange.shade800),
          ),
        ),
        child: widget);
  }
}
