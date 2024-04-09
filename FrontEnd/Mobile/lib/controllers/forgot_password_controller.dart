import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/custom_text.dart';

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
        Get.defaultDialog(
          title: 'Success',
          backgroundColor: Colors.lightBlue.shade100,
          content: Column(
            children: [
              const Icon(
                Icons.check_circle_outline,
                color: Colors.green,
              ),
              CustomBodyText(text: response.data["message"].toString()),
            ],
          ),
        );
      }
    } on DioException catch (e) {
      Get.defaultDialog(
        title: 'Failed',
        backgroundColor: Colors.orange.shade100,
        content: Column(
          children: [
            const Icon(
              Icons.cancel_outlined,
              color: Colors.red,
            ),
            CustomBodyText(text: e.response!.data["errors"].toString()),
          ],
        ),
      );
    }
  }
}
