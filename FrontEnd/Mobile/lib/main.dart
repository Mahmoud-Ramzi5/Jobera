import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/loginControllers/auth_controller.dart';
import 'package:jobera/controllers/homeControllers/settings_controller.dart';
import 'package:jobera/middleware/middleware.dart';
import 'package:jobera/views/homeViews/profile_view.dart';
import 'package:jobera/views/loginViews/forgot_password_view.dart';
import 'package:jobera/views/homeViews/home_view.dart';
import 'package:jobera/views/loginViews/login_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';
import 'package:jobera/views/homeViews/settings_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

SharedPreferences? sharedPreferences;
late bool isTokenValid;
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedPreferences = await SharedPreferences.getInstance();
  final AuthController authController = Get.put(AuthController());
  isTokenValid = await authController.checkToken();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    final SettingsController settingsController = Get.put(SettingsController());
    return GetMaterialApp(
      initialRoute: '/login',
      getPages: [
        GetPage(
          name: '/login',
          page: () => LoginView(),
          middlewares: [Middleware()],
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
          name: '/home',
          page: () => HomeView(),
        ),
        GetPage(
          name: '/settings',
          page: () => const SettingsView(),
        ),
        GetPage(
          name: '/profile',
          page: () => const ProfileView(),
        ),
      ],
      debugShowCheckedModeBanner: false,
      theme: settingsController.theme,
    );
  }
}
