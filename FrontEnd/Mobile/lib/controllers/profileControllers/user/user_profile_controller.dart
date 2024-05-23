import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/user.dart';
import 'package:permission_handler/permission_handler.dart';

class UserProfileController extends GetxController {
  late Dio dio;
  late User user;
  late TextEditingController editBioController;
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late ImagePicker picker;
  late XFile? image;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    user = User.empty();
    await fetchProfile();
    editBioController = TextEditingController(text: user.description);
    picker = ImagePicker();
    image = null;
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
      var response = await dio.get('http://10.0.2.2:8000/api/profile',
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
        e.response!.data["errors"].toString(),
      );
    }
  }

  Future<void> editBio(String text) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/profile/description',
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
        Get.back();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.statusMessage.toString(),
      );
    }
  }

  Future<void> pickPhotoFromGallery() async {
    const permission = Permission.photos;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        // Permission is granted
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      // Permission is granted
      image = await picker.pickImage(
        source: ImageSource.gallery,
      );
    }
  }

  Future<void> takePhotoFromCamera() async {
    const permission = Permission.camera;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        // Permission is granted
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      // Permission is granted
      image = await picker.pickImage(
        source: ImageSource.camera,
      );
    }
  }

  Future<void> addPhoto() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/profile/photo',
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
        data: {"avatar_photo": image},
      );
      if (response.statusCode == 200) {
        Dialogs().showSuccessDialog('Photo added successfully', '');
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.statusMessage.toString(),
      );
    }
  }
}
