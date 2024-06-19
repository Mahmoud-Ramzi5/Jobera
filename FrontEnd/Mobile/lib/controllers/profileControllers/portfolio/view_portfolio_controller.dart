import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/portfolio.dart';

class ViewPortfolioController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late Dio dio;

  List<Portfolio> portoflios = [];
  int id = 0;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    dio = Dio();

    await fetchPortfolios();
    super.onInit();
  }

  Future<dynamic> fetchPortfolios() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/portfolios',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        portoflios = [
          for (var portofolio in response.data['portfolios'])
            Portfolio.fromJson(
              {
                ...portofolio,
                'files': portofolio['files'] ?? [],
              },
            ),
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
        'http://192.168.0.107:8000/api/portfolios/$id',
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
