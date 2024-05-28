import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
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
  late File file;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    user = User.empty();
    await fetchProfile();
    editBioController = TextEditingController(text: user.description);
    picker = ImagePicker();
    image = null;
    file = File('D:/projects/Jobera/FrontEnd/Mobile/assets/Files');
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
      var response = await dio.get('http://192.168.0.101:8000/api/profile',
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
        e.response.toString(),
      );
    }
  }

  Future<void> editBio(String text) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.101:8000/api/profile/description',
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
        e.response.toString(),
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
    addPhoto();
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
    addPhoto();
  }

  Future<void> addPhoto() async {
    String? token = sharedPreferences?.getString('access_token');
    if (image != null) {
      FormData formData = FormData();
      formData.files.add(
        MapEntry(
          'avatar_photo',
          await MultipartFile.fromFile(image!.path),
        ),
      );
      try {
        var response = await dio.post(
          'http://192.168.0.101:8000/api/profile/photo',
          data: formData,
          options: Options(
            headers: {
              'Content-Type': 'multipart/form-data; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 200) {
          Dialogs().showSuccessDialog('Photo added successfully', '');
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.statusCode.toString(),
        );
      }
    } else {
      return;
    }
  }

  Future<void> fetchFile(String filePath) async {
    try {
      final response = await dio.get(
        'http://192.168.0.101:8000/api/file/$filePath',
        options: Options(
          responseType: ResponseType.bytes, // important
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf; charset=UTF-8',
            'Accept': 'application/pdf',
            'Connection': 'Keep-Alive',
          },
        ),
      );
      if (response.statusCode == 200) {
        print('GGGGGGGGGGGG');
        // Write the response data to the file
        await file.writeAsBytes(response.data);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.toString(),
      );
    }
  }
}
