import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
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
bool isValidToken = false;
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedPreferences = await SharedPreferences.getInstance();
  isValidToken = await checkToken();
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

Future<bool> checkToken() async {
  Dio dio = Dio();
  String? token = sharedPreferences!.getString('access_token');
  if (token == null) {
    return false;
  } else {
    try {
      var response = await dio.get('http://10.0.2.2:8000/api/isExpired',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        return true;
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Error',
        e.response!.data["errors"].toString(),
      );
    }
  }
  return false;
}
