import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/themes.dart';
import 'package:jobera/main.dart';

class SettingsController extends GetxController {
  late bool isDarkMode;
  late ThemeData theme;

  @override
  void onInit() {
    isDarkMode =
        sharedPreferences?.getBool('isDarkMode') == true ? true : false;
    theme = isDarkMode ? Themes.darkTheme : Themes.lightTheme;
    super.onInit();
  }

  void changeTheme(bool currentValue) {
    isDarkMode = currentValue;
    if (isDarkMode) {
      Get.changeTheme(Themes.darkTheme);
    } else {
      Get.changeTheme(Themes.lightTheme);
    }
    saveTheme(isDarkMode);
    update();
  }

  void saveTheme(bool isDarkMode) {
    sharedPreferences?.setBool('isDarkMode', isDarkMode);
  }
}
