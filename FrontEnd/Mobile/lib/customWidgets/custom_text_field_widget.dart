import 'package:flutter/material.dart';

class CustomTextFieldWidget extends StatelessWidget {
  final TextEditingController controller;
  final TextInputType textInputType;
  final bool obsecureText;
  final String? Function(String?)? validator;
  final String labelText;
  final Icon icon;
  final InkWell? inkWell;

  const CustomTextFieldWidget({
    super.key,
    required this.controller,
    required this.textInputType,
    required this.obsecureText,
    required this.labelText,
    required this.icon,
    this.validator,
    this.inkWell,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      autocorrect: false,
      obscureText: obsecureText,
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        labelStyle: Theme.of(context).textTheme.bodyLarge,
        border: const OutlineInputBorder(),
        prefixIcon: icon,
        prefixIconColor: Colors.lightBlue.shade900,
        suffixIcon: inkWell,
        suffixIconColor: Colors.lightBlue.shade900,
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
          borderSide: BorderSide(
            color: Colors.orange.shade800,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
          borderSide: BorderSide(
            color: Colors.lightBlue.shade900,
            width: 3,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
          borderSide: const BorderSide(
            color: Colors.red,
          ),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
          borderSide: const BorderSide(
            color: Colors.red,
          ),
        ),
      ),
      keyboardType: textInputType,
      style: Theme.of(context).textTheme.bodyLarge,
      validator: validator,
    );
  }
}
