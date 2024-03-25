import 'package:flutter/material.dart';

class CustomTheme {
  final ThemeData customTheme = ThemeData(
    primarySwatch: Colors.orange,
    useMaterial3: true,
    appBarTheme: AppBarTheme(
      color: Colors.orange.shade800,
      centerTitle: true,
      titleTextStyle: const TextStyle(
        color: Colors.white,
        fontSize: 30,
        fontWeight: FontWeight.bold,
      ),
      iconTheme: const IconThemeData(color: Colors.white),
    ),
    checkboxTheme: CheckboxThemeData(
      side: BorderSide(color: Colors.lightBlue.shade900),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
            backgroundColor: const MaterialStatePropertyAll(Colors.white),
            side: MaterialStatePropertyAll(
                BorderSide(color: Colors.lightBlue.shade900)))),
  );
}
