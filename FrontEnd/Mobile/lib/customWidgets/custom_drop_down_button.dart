import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';

class CustomDropDownButton extends StatelessWidget {
  final dynamic value;
  final void Function(dynamic) onChanged;
  final List<DropdownMenuItem<dynamic>>? items;
  final String text;

  const CustomDropDownButton({
    super.key,
    this.value,
    this.items,
    required this.onChanged,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: Get.width - 100,
      child: DropdownButton<dynamic>(
        value: value,
        onChanged: onChanged,
        iconEnabledColor: Colors.lightBlue.shade900,
        items: items,
        hint: BodyText(text: text),
        menuMaxHeight: 300,
        isExpanded: true,
      ),
    );
  }
}
