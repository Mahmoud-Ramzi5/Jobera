import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/portfolio.dart';

class ViewPortfolioController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late SettingsController settingsController;
  late HomeController homeController;
  late Dio dio;
  late UserProfileController? userProfileController;
  late CompanyProfileController? companyProfileController;
  List<Portfolio> portfolios = [];
  int id = 0;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    settingsController = Get.find<SettingsController>();
    homeController = Get.find<HomeController>();
    dio = Dio();
    if (!settingsController.isInRegister) {
      if (homeController.isOtherUserProfile) {
        await fetchPortfolios(
          homeController.otherUserId,
          homeController.otherUserName,
        );
      } else {
        if (homeController.isCompany) {
          companyProfileController = Get.find<CompanyProfileController>();
          userProfileController = null;
          await fetchPortfolios(
            companyProfileController!.company.id,
            companyProfileController!.company.name,
          );
        } else {
          userProfileController = Get.find<UserProfileController>();
          companyProfileController = null;
          await fetchPortfolios(
            userProfileController!.user.id,
            userProfileController!.user.name,
          );
        }
      }
    }
    loading = false;
    update();
    super.onInit();
  }

  void goBack() {
    if (!homeController.isOtherUserProfile) {
      if (homeController.isCompany) {
        companyProfileController!.refreshIndicatorKey.currentState!.show();
      } else {
        userProfileController!.refreshIndicatorKey.currentState!.show();
      }
    }
    Get.back();
  }

  void finishRegister() {
    settingsController.isInRegister = false;
    Get.offAllNamed('/home');
  }

  Future<dynamic> fetchPortfolios(int userId, String userName) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.106:8000/api/portfolios/$userId/$userName',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        portfolios = [
          for (var portfolio in response.data['portfolios'])
            (Portfolio.fromJson(portfolio)),
        ];
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<void> deletePortfolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.1.106:8000/api/portfolios/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 204) {
        refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }
}
