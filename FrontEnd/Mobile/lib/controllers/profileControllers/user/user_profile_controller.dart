import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/user.dart';

class UserProfileController extends GetxController {
  late Dio dio;
  late User user;
  late TextEditingController editBioController;
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late XFile? image;
  late GeneralController generalController;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    user = User.empty();
    await fetchProfile();
    editBioController = TextEditingController(text: user.description);
    image = null;
    generalController = Get.find<GeneralController>();
    super.onInit();
  }

  @override
  void onClose() {
    editBioController.dispose();
    super.onClose();
  }

  Future<void> fetchProfile() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get('http://192.168.1.7:8000/api/profile',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        user = User.fromJson(response.data['user']);
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
        'http://192.168.1.7:8000/api/profile/description',
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
        Get.back();
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
          'http://192.168.1.7:8000/api/profile/photo',
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
          Future.delayed(
            const Duration(seconds: 1),
            () {
              Dialogs().showSuccessDialog(
                'Photo added successfully',
                '',
              );
            },
          );
          refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
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
        'http://192.168.1.7:8000/api/profile/photo',
        options: Options(
          headers: {
            'Content-Type': 'application/pdf; charset=UTF-8',
            'Accept': 'application/pdf',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Dialogs().showSuccessDialog(
              'Success',
              response.data['message'],
            );
          },
        );
        refreshIndicatorKey.currentState!.show();
        Get.back();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
