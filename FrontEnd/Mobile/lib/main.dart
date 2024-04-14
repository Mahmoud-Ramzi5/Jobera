import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/settings_controller.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/login_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';
import 'package:jobera/views/settings_view.dart';
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
      getPages: [
        GetPage(
          name: '/login',
          page: () => LoginView(),
        ),
        GetPage(
          name: '/register',
          page: () => const RegisterView(),
        ),
        GetPage(
          name: '/forgotPassword',
          page: () => ForgotPasswordView(),
        ),
        GetPage(
          name: '/settings',
          page: () => const SettingsView(),
        ),
        GetPage(
          name: '/home',
          page: () => HomeView(),
        ),
      ],
      initialRoute: '/login',
      debugShowCheckedModeBanner: false,
      theme: settingsController.theme,
    );
  }
}
