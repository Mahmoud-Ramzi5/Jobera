import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/portofolio.dart';

class UserEditPortofolioController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late GlobalKey<FormState> formField;
  List<Portofolio> portofolios = [];

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    await fetchPortofolios();
    super.onInit();
  }

  Future<dynamic> fetchPortofolios() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.43.23:8000/api/portfolios',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        portofolios = [
          for (var portofolio in response.data['portfolios'])
            Portofolio.fromJson(
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

  Future<void> deletePortofolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.43.23:8000/api/portfolios/$id',
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
