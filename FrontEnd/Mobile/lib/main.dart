import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/enums.dart';
import 'package:jobera/controllers/loginControllers/auth_controller.dart';
import 'package:jobera/controllers/settings_controller.dart';
import 'package:jobera/routes/routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

SharedPreferences? sharedPreferences;
late MiddlewareCases middlewareCase;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedPreferences = await SharedPreferences.getInstance();
  final AuthController authController = Get.put(AuthController());
  middlewareCase = await authController.checkToken();

  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    final SettingsController settingsController = Get.put(SettingsController());
    return GetMaterialApp(
      initialRoute: '/splashScreen',
      getPages: getPages,
      debugShowCheckedModeBanner: false,
      theme: settingsController.theme,
    );
  }
}
