import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/user.dart';

class UserProfileController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late SettingsController settingsController;
  late HomeController homeController;
  late Dio dio;
  late User user;
  late TextEditingController editBioController;
  late XFile? image;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    settingsController = Get.find<SettingsController>();
    if (settingsController.isInRegister) {
      homeController = Get.put(HomeController());
    } else {
      homeController = Get.find<HomeController>();
    }
    dio = Dio();
    user = User.empty();
    if (homeController.isOtherUserProfile) {
      await fetchOtherUserProfile(
        homeController.otherUserId,
        homeController.otherUserName,
      );
    } else {
      await fetchProfile();
    }
    editBioController = TextEditingController();
    image = null;
    super.onInit();
  }

  @override
  void onClose() {
    editBioController.dispose();
    super.onClose();
  }

  void goBack() {
    homeController.refreshIndicatorKey.currentState!.show();
    homeController.update();
    Get.back();
  }

  Future<void> fetchProfile() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get('http://192.168.137.49:8000/api/profile',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        user = User.fromJson(response.data['user']);
        loading = false;
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> fetchOtherUserProfile(int userId, String userName) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
          'http://192.168.137.49:8000/api/profile/$userId/$userName',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        user = User.fromJson(response.data['user']);
        loading = false;
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> editBio(String text) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.137.49:8000/api/profile/description',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
        data: {"description": text},
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        Future.delayed(
          const Duration(seconds: 2),
          () {
            Get.back();
          },
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> addPhoto() async {
    String? token = sharedPreferences?.getString('access_token');
    if (image != null) {
      final data = FormData.fromMap(
        {
          'avatar_photo': await MultipartFile.fromFile(image!.path),
        },
      );
      try {
        var response = await dio.post(
          'http://192.168.137.49:8000/api/profile/photo',
          data: data,
          options: Options(
            headers: {
              'Content-Type': 'multipart/form-data; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 200) {
          refreshIndicatorKey.currentState!.show();
          Dialogs().showSuccessDialog(
            'Photo added successfully',
            '',
          );
          Future.delayed(
            const Duration(seconds: 2),
            () {
              Get.back();
              Get.back();
            },
          );
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
        );
        Future.delayed(
          const Duration(seconds: 2),
          () {
            Get.back();
          },
        );
      }
    } else {
      return;
    }
  }

  Future<void> removePhoto() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      final response = await dio.delete(
        'http://192.168.137.49:8000/api/profile/photo',
        options: Options(
          headers: {
            'Content-Type': 'application/pdf; charset=UTF-8',
            'Accept': 'application/pdf',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        Dialogs().showSuccessDialog(
          'Success',
          response.data['message'].toString(),
        );
        Future.delayed(
          const Duration(seconds: 2),
          () {
            Get.back();
            Get.back();
          },
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
      Future.delayed(
        const Duration(seconds: 2),
        () {
          Get.back();
        },
      );
    }
  }
}
