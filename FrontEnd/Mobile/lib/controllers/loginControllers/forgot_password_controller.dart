import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';

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
        'http://192.168.1.106:8000/api/password/reset-link',
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
          '155'.tr,
          response.data["message"].toString(),
        );
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.back();
          },
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '159'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }
}
