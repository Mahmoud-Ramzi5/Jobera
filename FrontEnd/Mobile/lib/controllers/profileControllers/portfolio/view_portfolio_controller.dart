import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/portfolio.dart';

class ViewPortfolioController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late SettingsController settingsController;
  late Dio dio;
  late ProfileController? profileController;
  List<Portfolio> portfolios = [];
  int id = 0;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    settingsController = Get.find<SettingsController>();
    dio = Dio();
    profileController = null;
    if (!settingsController.isInRegister) {
      profileController = Get.find<ProfileController>();
      await fetchPortfolios();
    }

    loading = false;
    update();
    super.onInit();
  }

  void goBack() {
    profileController!.refreshIndicatorKey.currentState!.show();
    Get.back();
  }

  void finishRegister() {
    settingsController.isInRegister = false;
    Get.offAllNamed('/home');
  }

  Future<dynamic> fetchPortfolios() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/portfolios/${profileController!.user.id}/${profileController!.user.name}',
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
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> deletePortfolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.39.51:8000/api/portfolios/$id',
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
        'Error',
        e.response.toString(),
      );
    }
  }
}
