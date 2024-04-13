import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/settings_controller.dart';
import 'package:jobera/views/login_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

SharedPreferences? sharedPreferences;
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedPreferences = await SharedPreferences.getInstance();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    final SettingsController settingsController = Get.put(SettingsController());
    return GetMaterialApp(
      home: LoginView(),
      debugShowCheckedModeBanner: false,
      theme: settingsController.theme,
    );
  }
}
