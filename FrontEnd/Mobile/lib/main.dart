import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/Theme_and_Style/custom_theme.dart';
import 'package:jobera/views/login_view.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        home: const LoginView(),
        debugShowCheckedModeBanner: false,
        theme: CustomTheme().customTheme);
  }
}
