import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
    return GetMaterialApp(
      home: const LoginView(),
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.orange.shade800,
        appBarTheme: AppBarTheme(
          color: Colors.lightBlue.shade900,
          iconTheme: const IconThemeData(color: Colors.white),
        ),
        textTheme: TextTheme(
          labelLarge: TextStyle(color: Colors.orange.shade800),
          labelMedium: TextStyle(color: Colors.orange.shade800),
          bodyLarge: TextStyle(color: Colors.lightBlue.shade900),
          headlineSmall: TextStyle(color: Colors.orange.shade800),
          headlineMedium: TextStyle(color: Colors.orange.shade800),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.orange.shade100),
          ),
        ),
      ),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.light,
    );
  }
}
