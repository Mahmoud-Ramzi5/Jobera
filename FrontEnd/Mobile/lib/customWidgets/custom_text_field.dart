import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final TextInputType textInputType;
  final bool obsecureText;
  final String? Function(String?)? validator;
  final String? labelText;
  final IconData icon;
  final InkWell? inkWell;
  final int? maxLength;
  final String? initialValue;
  final String? hintText;
  final void Function(String)? onChanged;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.textInputType,
    required this.obsecureText,
    required this.icon,
    this.labelText,
    this.validator,
    this.inkWell,
    this.maxLength,
    this.initialValue,
    this.hintText,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      cursorColor: Colors.lightBlue.shade900,
      initialValue: initialValue,
      autocorrect: false,
      obscureText: obsecureText,
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: Theme.of(context).textTheme.bodyLarge,
        labelText: labelText,
        labelStyle: Theme.of(context).textTheme.bodyLarge,
        border: const OutlineInputBorder(),
        prefixIcon: Icon(
          icon,
          color: Colors.lightBlue.shade900,
        ),
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
      maxLength: maxLength,
      onChanged: onChanged,
    );
  }
}
