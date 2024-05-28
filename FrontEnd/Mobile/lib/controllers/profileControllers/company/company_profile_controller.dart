import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:permission_handler/permission_handler.dart';

class CompanyProfileController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late Company company;
  late TextEditingController editBioController;
  late ImagePicker picker;
  late XFile? image;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    company = Company.empty();
    await fetchProfile();
    editBioController = TextEditingController(text: company.description);
    picker = ImagePicker();
    image = null;
    super.onInit();
  }

  @override
  onClose() {
    editBioController.dispose();
    super.onClose();
  }

  Future<void> fetchProfile() async {
    String? token = sharedPreferences?.getString('access_token');
    Dio dio = Dio();
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
        company = Company.fromJson(response.data['user']);
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
  }
}
