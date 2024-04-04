import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_text.dart';

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
    return DropdownButton<dynamic>(
      value: value,
      onChanged: onChanged,
      dropdownColor: Colors.orange.shade100,
      iconEnabledColor: Colors.lightBlue.shade900,
      items: items,
      hint: CustomBodyText(text: text),
    );
  }
}
