import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/enums.dart';
import 'package:jobera/controllers/loginControllers/auth_controller.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/routes/routes.dart';
import 'package:pusher_beams/pusher_beams.dart';
import 'package:shared_preferences/shared_preferences.dart';

SharedPreferences? sharedPreferences;
late MiddlewareCases middlewareCase;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PusherBeams.instance.start('8a1adda3-cbf6-4ac7-b9b5-d8d8669217ac');
  await PusherBeams.instance.setDeviceInterests(['TEST']);
  await PusherBeams.instance.setDeviceInterests(['debug-test']);
  await initialMessage();
  sharedPreferences = await SharedPreferences.getInstance();
  final AuthController authController = Get.put(AuthController());
  middlewareCase = await authController.checkToken();
  runApp(const MainApp());
}

Future<void> initialMessage() async {
  final initMessage = await PusherBeams.instance.getInitialMessage();
  log('_initialMessage: ${initMessage.toString()}');
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
      themeMode: ThemeMode.light,
      onReady: () => settingsController.requestPermissions(),
    );
  }
}
