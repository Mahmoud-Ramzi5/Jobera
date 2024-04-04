import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ForgotPasswordController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController emailController;
  late bool isEmailSentSuccessfully;
  late Dio dio;

  @override
  onInit() {
    formField = GlobalKey<FormState>();
    emailController = TextEditingController();
    isEmailSentSuccessfully = false;
    dio = Dio();
    super.onInit();
  }

  @override
  onClose() {
    emailController.dispose();
    super.onClose();
  }

  Future<dynamic> forgotPassword(
    String email,
  ) async {
    try {
      var response =
          await dio.post('http://10.0.2.2:8000/api/password/reset-link',
              data: {"email": email},
              options: Options(
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json',
                },
              ));
      if (response.statusCode == 200) {
        isEmailSentSuccessfully = true;
        return response.data["message"].toString();
      }
    } on DioException catch (e) {
      isEmailSentSuccessfully = false;
      return e.response?.data["errors"].toString();
    }
  }
}
