import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:jobera/models/user.dart';

class HomeController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  User? user;
  Company? company;
  late String name;
  late String email;
  late int id;
  late String? photo;
  late String step;
  late SettingsController settingsController;
  late int notificationsCount;
  bool isOtherUserProfile = false;
  int otherUserId = 0;
  String otherUserName = '';
  bool isCompany = false;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    name = '';
    email = '';
    id = 0;
    photo = '';
    settingsController = Get.find<SettingsController>();
    notificationsCount = 0;
    await fetchUser();
    super.onInit();
  }

  Future<void> fetchUser() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/profile',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        if (response.data['user']['type'] == 'company') {
          company = Company.fromJson(response.data['user']);
          name = company!.name;
          email = company!.email;
          id = company!.id;
          photo = company!.photo;
          step = '';
          isCompany = true;
          notificationsCount = company!.notificationsCount;
        } else if (response.data['user']['type'] == 'individual') {
          user = User.fromJson(response.data['user']);
          name = user!.name;
          email = user!.email;
          id = user!.id;
          photo = user!.photo;
          step = user!.step;
          isCompany = false;
          notificationsCount = user!.notificationsCount;
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
        'http://192.168.0.107:8000/api/logout',
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
      Dialogs().showErrorDialog(
        'Logout Failed',
        e.response!.data['errors'].toString(),
      );
    }
  }

  void continueRegister() {
    switch (step) {
      case 'SKILLS':
        settingsController.isInRegister = true;
        Get.offAllNamed('/userEditSkills');
      case 'EDUCATION':
        settingsController.isInRegister = true;
        Get.offAllNamed('/userEditEducation');
      default:
        return;
    }
  }
}
