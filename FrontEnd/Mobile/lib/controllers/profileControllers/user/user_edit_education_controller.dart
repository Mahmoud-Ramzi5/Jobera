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

class UserEditEducationController extends GetxController {
  late UserProfileController profileController;
  late User user;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late List<String> levels;
  late String selectedLevel;
  late TextEditingController editFieldController;
  late TextEditingController editSchoolController;
  late DateTime startDate;
  late DateTime endDate;
  late String? certficateName;
  late FilePickerResult? file;
  late GeneralController generalController;

  @override
  void onInit() {
    profileController = Get.find<UserProfileController>();
    user = profileController.user;
    formField = GlobalKey<FormState>();
    dio = Dio();
    levels = [
      'Bachelor',
      'Master',
      'PHD',
      'High School Diploma',
      'High Institute',
    ];
    selectedLevel = user.education.level;
    editFieldController = TextEditingController(text: user.education.field);
    editSchoolController = TextEditingController(text: user.education.school);
    startDate = DateTime(
      int.parse(
        user.education.startDate.substring(0, 4),
      ),
      int.parse(
        user.education.startDate.substring(8, 10),
      ),
      int.parse(
        user.education.startDate.substring(6, 7),
      ),
    );
    endDate = DateTime(
      int.parse(
        user.education.endDate.substring(0, 4),
      ),
      int.parse(
        user.education.endDate.substring(6, 7),
      ),
      int.parse(
        user.education.endDate.substring(8, 10),
      ),
    );
    certficateName = Uri.file(
      user.education.certificateFile.toString(),
    ).pathSegments.last;
    file = null;
    generalController = Get.find<GeneralController>();
    super.onInit();
  }

  @override
  void onClose() {
    editFieldController.dispose();
    editSchoolController.dispose();
    super.onClose();
  }

  void selectLevel(String level) {
    selectedLevel = level;
    update();
  }

  Future<void> selectDate(BuildContext context, DateTime date) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        initialDate: date,
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null) {
      if (date == startDate) {
        startDate = picked;
      } else if (date == endDate) {
        endDate = picked;
      }
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

  Future<void> editEducation(
    String level,
    String field,
    String school,
    String startDate,
    String endDate,
    FilePickerResult? file,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/education',
        data: {
          'level': level,
          'field': field,
          'school': school,
          'start_date': startDate,
          'end_date': endDate,
          'certificate_file': file,
        },
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': '$token',
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        profileController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.statusCode.toString(),
      );
    }
  }
}
