import 'package:flutter/material.dart';
import 'package:jobera/Theme_and_Style/custom_text_style.dart';

class CustomTextFieldWidget extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final bool obsecureText;
  final Icon icon;
  final String? Function(String?)? validator;
  final TextInputType? inputType;
  final InkWell? inkWell;

  const CustomTextFieldWidget({
    required this.controller,
    required this.labelText,
    required this.icon,
    required this.obsecureText,
    this.validator,
    this.inputType,
    super.key,
    this.inkWell,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      autocorrect: false,
      enableSuggestions: false,
      keyboardType: inputType,
      validator: validator,
      obscureText: obsecureText,
      cursorColor: Colors.lightBlue.shade900,
      decoration: InputDecoration(
        alignLabelWithHint: true,
        labelText: labelText,
        labelStyle: CustomTextStyle().mediumTextStyle,
        focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(50),
            borderSide: BorderSide(color: Colors.lightBlue.shade900)),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
        ),
        prefixIcon: icon,
        prefixIconColor: Colors.lightBlue.shade900,
        suffixIcon: inkWell,
        suffixIconColor: Colors.lightBlue.shade900,
      ),
    );
  }
}
