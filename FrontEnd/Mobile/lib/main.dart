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
      home: LoginView(),
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.orange.shade800,
        appBarTheme: AppBarTheme(
          titleTextStyle: Theme.of(context).textTheme.titleLarge,
          color: Colors.lightBlue.shade900,
          iconTheme: const IconThemeData(color: Colors.white),
          centerTitle: true,
        ),
        textTheme: TextTheme(
          titleLarge: const TextStyle(color: Colors.white),
          labelLarge: TextStyle(color: Colors.orange.shade800),
          bodyLarge: TextStyle(color: Colors.lightBlue.shade900),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.orange.shade100),
          ),
        ),
        checkboxTheme: const CheckboxThemeData(
          shape: CircleBorder(),
        ),
        radioTheme: RadioThemeData(
          fillColor: MaterialStatePropertyAll(Colors.orange.shade800),
        ),
      ),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.light,
    );
  }
}
