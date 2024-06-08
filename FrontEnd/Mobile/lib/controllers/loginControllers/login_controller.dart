import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';

class LoginController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late bool passwordToggle;
  late bool remeberMe;
  late Dio dio;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    passwordToggle = true;
    remeberMe = false;
    dio = Dio();
    super.onInit();
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    super.onClose();
  }

  void toggleRemeberMe(bool rememberMe) {
    remeberMe = !remeberMe;
    update();
  }

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
  }

  Future<dynamic> login(
    String email,
    String password,
    bool rememberMe,
  ) async {
    try {
      var response = await dio.post('http://192.168.1.2:8000/api/login',
          data: {"email": email, "password": password, "remember": remeberMe},
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
            },
          ));
      if (response.statusCode == 200) {
        sharedPreferences?.setString(
          "access_token",
          response.data["access_token"].toString(),
        );
        Dialogs().showSuccessDialog('Login Successfull', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/home');
          },
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Login Failed',
        e.toString(),
      );
    }
  }
}
