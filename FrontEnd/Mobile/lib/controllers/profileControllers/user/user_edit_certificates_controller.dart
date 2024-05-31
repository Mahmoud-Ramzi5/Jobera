import 'dart:io';

import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/user.dart';
import 'package:open_filex/open_filex.dart';
import 'package:permission_handler/permission_handler.dart';

class UserEditCertificatesController extends GetxController {
  late UserProfileController profileController;
  late GlobalKey<FormState> formField;
  late User user;
  late GeneralController generalController;
  late Dio dio;
  late TextEditingController newNameController;
  late TextEditingController newOrganizationController;
  late DateTime? newDate;
  late String? newFileName;
  late FilePickerResult? file;

  @override
  Future<void> onInit() async {
    profileController = Get.find<UserProfileController>();
    formField = GlobalKey<FormState>();
    user = profileController.user;
    generalController = Get.find<GeneralController>();
    dio = Dio();
    newNameController = TextEditingController();
    newOrganizationController = TextEditingController();
    newDate = DateTime.now();
    file = const FilePickerResult([]);
    newFileName = null;
    super.onInit();
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now(),
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null && picked != newDate) {
      newDate = picked;
      update();
    }
  }

  Future<void> fetchFile(String fileName, String type) async {
    const permission = Permission.manageExternalStorage;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        // Permission is granted
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      // Permission is granted
      if (Platform.isIOS) {
        return;
      } else {
        Directory directory =
            Directory('/storage/emulated/0/Download/jobera/$type');
        bool directoryExists = await directory.exists();
        if (!directoryExists) {
          await directory.create(recursive: true);
        }
        File file =
            File('${directory.path}/${Uri.file(fileName).pathSegments.last}');
        bool fileExists = await file.exists();
        if (fileExists) {
          await OpenFilex.open(file.path);
        } else {
          dynamic fileData = await generalController.downloadFile(fileName);
          await file.writeAsBytes(fileData, flush: true);
          await OpenFilex.open(file.path);
        }
      }
    }
  }

  Future<void> deleteCertificate(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.0.105:8000/api/certificates/$id',
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        Dialogs().showSuccessDialog('Deleted Succesfully', '');
        profileController.refreshIndicatorKey.currentState!.show;
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> addCertificate(
    String name,
    String organization,
    String date,
    FilePickerResult file,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/certificates/add',
        data: {
          'name': name,
          'organization': organization,
          'release_date': date,
          'file': file,
        },
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {}
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.statusCode.toString(),
      );
    }
  }
}
