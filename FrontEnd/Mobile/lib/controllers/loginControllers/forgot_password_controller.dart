import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';

class ForgotPasswordController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController emailController;
  late Dio dio;

  @override
  onInit() {
    formField = GlobalKey<FormState>();
    emailController = TextEditingController();
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
      var response = await dio.post(
        'http://192.168.0.106:8000/api/password/reset-link',
        data: {"email": email},
        options: Options(
          contentType: 'application/json; charset=UTF-8',
          headers: {
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        Dialogs().showSuccessDialog(
          'Success',
          response.data["message"].toString(),
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Failed',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
