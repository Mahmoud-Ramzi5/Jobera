import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:jobera/models/user.dart';

class HomeController extends GetxController {
  late Dio dio;
  late bool isCompany;
  User? user;
  Company? company;
  late String name;
  late String email;
  late String? photo;
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late String step;
  late GeneralController generalController;

  @override
  Future<void> onInit() async {
    dio = Dio();
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    isCompany = false;
    name = '';
    email = '';
    photo = '';
    generalController = Get.find<GeneralController>();
    await fetchUser();
    super.onInit();
  }

  Future<void> fetchUser() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get('http://10.0.2.2:8000/api/profile',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        if (response.data['user']['type'] == 'company') {
          company = Company.fromJson(response.data['user']);
          name = company!.name;
          email = company!.email;
          photo = company!.photo;
          step = '';
          isCompany = true;
        } else if (response.data['user']['type'] == 'individual') {
          user = User.fromJson(response.data['user']);
          name = user!.name;
          email = user!.email;
          photo = user!.photo;
          step = user!.step;
          isCompany = false;
          continueRegister();
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> logout() async {
    Dialogs().loadingDialog();
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/logout',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );

      if (response.statusCode == 200) {
        Get.back();
        sharedPreferences?.remove('access_token');
        Dialogs().showSuccessDialog(
          'Logout Successfull',
          '',
        );
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/login');
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Logout Failed',
        e.response!.data['errors'].toString(),
      );
    }
  }

  void continueRegister() {
    switch (step) {
      case 'SKILLS':
        generalController.isInRegister = true;
        Get.offAllNamed('/userEditSkills');
      case 'EDUCATION':
        generalController.isInRegister = true;
        Get.offAllNamed('/userEditEducation');
      default:
        return;
    }
  }
}
