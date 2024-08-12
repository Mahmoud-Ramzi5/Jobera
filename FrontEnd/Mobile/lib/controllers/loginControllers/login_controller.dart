import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';

class LoginController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late bool passwordToggle;
  late bool remeberMe;
  late Dio dio;
  late GoogleSignIn googleSignIn;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    passwordToggle = true;
    remeberMe = false;
    dio = Dio();
    googleSignIn = GoogleSignIn();
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
    Dialogs().loadingDialog();
    try {
      var response = await dio.post(
        'http://192.168.1.2:8000/api/login',
        data: {"email": email, "password": password, "remember": remeberMe},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        sharedPreferences?.setString(
          "access_token",
          response.data["access_token"].toString(),
        );
        Dialogs().showSuccessDialog(
          'Login Successfull',
          '',
        );
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
        e.response.toString(),
      );
    }
  }

  Future<void> handleGoogleSignIn() async {
    GoogleSignInAccount? googleSignInAccount;
    try {
      googleSignInAccount = await googleSignIn.signIn();
      if (googleSignInAccount != null) {
        try {
          var response = await dio.post(
            'http://192.168.1.2:8000/api/auth/android/google',
            data: {
              'provider_id': googleSignInAccount.id,
              'email': googleSignInAccount.email,
              'avatar_photo': googleSignInAccount.photoUrl,
              'provider': 'google',
            },
            options: Options(
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
              },
            ),
          );
          if (response.statusCode == 200) {
            sharedPreferences?.setString(
              "access_token",
              response.data["access_token"].toString(),
            );
            Dialogs().showSuccessDialog(
              'Login Successfull',
              '',
            );
            Future.delayed(
              const Duration(seconds: 1),
              () {
                Get.offAllNamed('/home');
              },
            );
          }
        } on DioException catch (e) {
          Dialogs().showErrorDialog(
            'Login with google failed',
            e.toString(),
          );
        }
      }
    } catch (e) {
      Dialogs().showErrorDialog(
        'Login with google failed',
        e.toString(),
      );
    }
  }
}
