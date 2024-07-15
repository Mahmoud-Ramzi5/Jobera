import 'package:flutter/material.dart';

class Themes {
  static final lightTheme = ThemeData(
    colorSchemeSeed: Colors.orange.shade800,
    appBarTheme: AppBarTheme(
      titleTextStyle: const TextTheme().titleLarge,
      color: Colors.lightBlue.shade900,
      iconTheme: const IconThemeData(color: Colors.white),
      centerTitle: true,
    ),
    textTheme: TextTheme(
      titleLarge: const TextStyle(color: Colors.white),
      headlineSmall: TextStyle(color: Colors.lightBlue.shade900),
      headlineMedium: TextStyle(color: Colors.orange.shade800),
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
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: Colors.orange.shade100,
    ),
    checkboxTheme: const CheckboxThemeData(
      shape: CircleBorder(),
    ),
    radioTheme: RadioThemeData(
      fillColor: MaterialStatePropertyAll(Colors.orange.shade800),
    ),
    tabBarTheme: TabBarTheme(
      labelPadding: const EdgeInsets.all(5),
      overlayColor: const MaterialStatePropertyAll(Colors.transparent),
      labelColor: Colors.lightBlue.shade900,
      unselectedLabelColor: Colors.black,
      indicatorSize: TabBarIndicatorSize.tab,
      dividerColor: Colors.transparent,
      indicatorColor: Colors.transparent,
    ),
    datePickerTheme: DatePickerThemeData(
      todayForegroundColor: MaterialStatePropertyAll(Colors.orange.shade800),
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(
      color: Colors.orange.shade800,
      linearMinHeight: 8,
    ),
    dividerTheme: DividerThemeData(
      thickness: 1,
      color: Colors.lightBlue.shade900,
    ),
    chipTheme: ChipThemeData(
      shape: StadiumBorder(
        side: BorderSide(
          color: Colors.orange.shade800,
          width: 2,
        ),
      ),
      deleteIconColor: Colors.red,
    ),
    searchBarTheme: SearchBarThemeData(
      shape: const MaterialStatePropertyAll(
        StadiumBorder(),
      ),
      hintStyle: MaterialStatePropertyAll(
        TextStyle(color: Colors.lightBlue.shade900),
      ),
      textStyle: MaterialStatePropertyAll(
        TextStyle(color: Colors.lightBlue.shade900),
      ),
      side: MaterialStatePropertyAll(
        BorderSide(
          color: Colors.orange.shade800,
        ),
      ),
    ),
    cardTheme: const CardTheme(
      shape: BeveledRectangleBorder(),
      elevation: 5,
    ),
  );

  static final darkTheme = ThemeData.dark().copyWith(
    appBarTheme: AppBarTheme(
      titleTextStyle: const TextTheme().titleLarge,
      iconTheme: const IconThemeData(color: Colors.white),
      centerTitle: true,
    ),
    textTheme: TextTheme(
      titleLarge: const TextStyle(color: Colors.white),
      headlineSmall: TextStyle(color: Colors.lightBlue.shade900),
      headlineMedium: TextStyle(color: Colors.orange.shade800),
      labelLarge: TextStyle(color: Colors.orange.shade800),
      bodyLarge: const TextStyle(color: Colors.white),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
        backgroundColor: MaterialStatePropertyAll(Colors.orange.shade800),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: ButtonStyle(
        side: MaterialStatePropertyAll(
          BorderSide(color: Colors.orange.shade800),
        ),
      ),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: Colors.orange.shade800,
    ),
    checkboxTheme: const CheckboxThemeData(
      shape: CircleBorder(),
      checkColor: MaterialStatePropertyAll(Colors.white),
    ),
    radioTheme: RadioThemeData(
      fillColor: MaterialStatePropertyAll(Colors.orange.shade800),
    ),
    tabBarTheme: TabBarTheme(
      overlayColor: const MaterialStatePropertyAll(Colors.transparent),
      labelColor: Colors.lightBlue.shade900,
      unselectedLabelColor: Colors.white,
      indicatorSize: TabBarIndicatorSize.tab,
      dividerColor: Colors.transparent,
      indicatorColor: Colors.transparent,
    ),
    datePickerTheme: const DatePickerThemeData(
      todayForegroundColor: MaterialStatePropertyAll(Colors.white),
    ),
    switchTheme: SwitchThemeData(
      trackColor: MaterialStatePropertyAll(Colors.orange.shade800),
      thumbColor: const MaterialStatePropertyAll(Colors.white),
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(
      color: Colors.orange.shade800,
      linearMinHeight: 8,
    ),
    dividerTheme: DividerThemeData(
      thickness: 1,
      color: Colors.lightBlue.shade900,
    ),
    chipTheme: ChipThemeData(
      shape: StadiumBorder(
        side: BorderSide(color: Colors.orange.shade800, width: 2),
      ),
      deleteIconColor: Colors.red,
    ),
    searchBarTheme: SearchBarThemeData(
      shape: const MaterialStatePropertyAll(
        StadiumBorder(),
      ),
      hintStyle: const MaterialStatePropertyAll(
        TextStyle(color: Colors.white),
      ),
      textStyle: const MaterialStatePropertyAll(
        TextStyle(color: Colors.white),
      ),
      side: MaterialStatePropertyAll(
        BorderSide(
          color: Colors.orange.shade800,
        ),
      ),
    ),
    cardTheme: const CardTheme(
      shape: BeveledRectangleBorder(),
      elevation: 5,
    ),
  );
}
