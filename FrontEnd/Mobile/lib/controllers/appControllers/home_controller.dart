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
  late SettingsController settingsController;
  late Dio dio;
  int id = 0;
  String name = '';
  String email = '';
  String? photo;
  String step = '';
  int notificationsCount = 0;
  User? user;
  Company? company;
  bool isOtherUserProfile = false;
  int otherUserId = 0;
  String otherUserName = '';
  bool isCompany = false;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    settingsController = Get.find<SettingsController>();
    dio = Dio();
    await fetchUser();
    super.onInit();
  }

  Future<void> fetchUser() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/profile',
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
          id = company!.id;
          name = company!.name;
          email = company!.email;
          photo = company!.photo;
          step = '';
          notificationsCount = company!.notificationsCount;
          isCompany = true;
        } else if (response.data['user']['type'] == 'individual') {
          user = User.fromJson(response.data['user']);
          id = user!.id;
          name = user!.name;
          email = user!.email;
          photo = user!.photo;
          step = user!.step;
          notificationsCount = user!.notificationsCount;
          isCompany = false;
          continueRegister();
        }
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> logout() async {
    Dialogs().loadingDialog();
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.39.51:8000/api/logout',
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
          '164'.tr,
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
        '165'.tr,
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
