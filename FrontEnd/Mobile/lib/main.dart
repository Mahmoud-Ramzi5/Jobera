import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/auth_controller.dart';
import 'package:jobera/controllers/settings_controller.dart';
import 'package:jobera/middleware/middleware.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/login_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';
import 'package:jobera/views/settings_view.dart';
import 'package:jobera/views/splash_screen.dart';
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
      initialRoute: '/splashScreen',
      getPages: [
        GetPage(
          name: '/splashScreen',
          page: () => const SplashScreen(),
          middlewares: [Middleware()],
        ),
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
      debugShowCheckedModeBanner: false,
      theme: settingsController.theme,
    );
  }
}
