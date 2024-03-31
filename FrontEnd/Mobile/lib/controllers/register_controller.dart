import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RegisterController extends GetxController {
  GlobalKey<FormState> formField = GlobalKey<FormState>();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  bool passwordToggle = true;
  bool confrimPasswordToggle = true;
  bool isRegistered = false;
  DateTime selectedDate = DateTime.now();
  String selectedGender = 'male';
  CountryCode countryCode = CountryCode(dialCode: '+963');

  void togglePassword(bool passwordToggle) {
    this.passwordToggle = !this.passwordToggle;
    update();
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
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

  void changeCountryCode(CountryCode code) {
    countryCode = code;
    update();
  }
}
