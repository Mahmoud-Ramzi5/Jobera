import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/notifications.dart';

class NotificationsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late HomeController homeController;
  late Dio dio;
  List<Notifications> notifications = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    homeController = Get.find<HomeController>();
    dio = Dio();
    await fetchNotifications();
    loading = false;
    update();
    super.onInit();
  }

  void goBack() {
    homeController.refreshIndicatorKey.currentState!.show();
    homeController.update();
    Get.back();
  }

  Future<dynamic> fetchNotifications() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.2:8000/api/notifications',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        notifications = [
          for (var notification in response.data['notifications'])
            Notifications.fromJson(notification)
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

  Future<dynamic> deleteNotification(String id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.1.2:8000/api/notification/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );

      if (response.statusCode == 204) {
        refreshIndicatorKey.currentState!.show();
        update();
        homeController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> markNotification(String id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.1.2:8000/api/notifications',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {'notification_id': id},
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        update();
        homeController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
