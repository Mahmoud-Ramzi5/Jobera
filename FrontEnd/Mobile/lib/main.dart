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
          iconTheme: IconThemeData(color: Colors.cyan.shade500),
          centerTitle: true,
        ),
        textTheme: TextTheme(
          titleLarge: TextStyle(color: Colors.cyan.shade500),
          labelLarge: TextStyle(color: Colors.orange.shade800),
          bodyLarge: TextStyle(color: Colors.lightBlue.shade900),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.orange.shade100),
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
            side: MaterialStatePropertyAll(
              BorderSide(color: Colors.orange.shade800),
            ),
          ),
        ),
        checkboxTheme: const CheckboxThemeData(
          shape: CircleBorder(),
        ),
        radioTheme: RadioThemeData(
          fillColor: MaterialStatePropertyAll(Colors.orange.shade800),
        ),
        tabBarTheme: TabBarTheme(
          overlayColor: const MaterialStatePropertyAll(Colors.transparent),
          labelColor: Colors.lightBlue.shade900,
          unselectedLabelColor: Colors.black,
          indicatorSize: TabBarIndicatorSize.tab,
          dividerColor: Colors.transparent,
          indicator: ShapeDecoration(
            shape: CircleBorder(
              side: BorderSide(
                strokeAlign: 10,
                color: Colors.orange.shade800,
              ),
            ),
          ),
        ),
        datePickerTheme: DatePickerThemeData(
          backgroundColor: Colors.orange.shade100,
          dayStyle: Theme.of(context).textTheme.bodyLarge,
          headerBackgroundColor: Colors.lightBlue.shade900,
          headerForegroundColor: Colors.orange.shade800,
          headerHelpStyle: Theme.of(context).textTheme.bodyLarge,
        ),
      ),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.light,
    );
  }
}
