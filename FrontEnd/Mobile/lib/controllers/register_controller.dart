import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RegisterController extends GetxController {
  bool passwordToggle = true;
  bool confrimPasswordToggle = true;
  bool isRegistered = false;
  DateTime selectedDate = DateTime.now();
  String selectedGender = 'male';

  void togglePassword(bool passwordToggle) {
    this.passwordToggle = !this.passwordToggle;
    update();
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now());
    if (picked != null && picked != selectedDate) {
      selectedDate = picked;
      update();
    }
  }

  void changeGender(String value) {
    selectedGender = value;
    update();
  }
}
