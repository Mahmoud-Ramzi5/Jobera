import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/education.dart';

class UserEditEducationController extends GetxController {
  late UserProfileController profileController;
  late Education education;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late Map<String, String> levels;
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
    education = profileController.user.education;
    formField = GlobalKey<FormState>();
    dio = Dio();
    levels = {
      'Bachelor': 'BACHELOR',
      'Master': 'MASTER',
      'PHD': 'PHD',
      'High School Diploma': 'HIGH_SCHOOL_DIPLOMA',
      'High Institute': 'HIGH_INSTITUTE',
    };

    selectedLevel = education.level;
    editFieldController = TextEditingController(text: education.field);
    editSchoolController = TextEditingController(text: education.school);
    List<String> parts1 = education.startDate.split('-');
    int day1 = int.parse(parts1[0]);
    int month1 = int.parse(parts1[1]);
    int year1 = int.parse(parts1[2]);
    startDate = DateTime(year1, month1, day1);
    List<String> parts2 = education.endDate.split('-');
    int day2 = int.parse(parts2[0]);
    int month2 = int.parse(parts2[1]);
    int year2 = int.parse(parts2[2]);
    endDate = DateTime(year2, month2, day2);
    certficateName = education.certificateFile == null
        ? 'No file'
        : Uri.file(
            education.certificateFile.toString(),
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

  void changeFileName() {
    if (file != null) {
      certficateName = file!.files[0].name;
    }
    update();
  }

  void removeFile() {
    file = null;
    certficateName = 'No file';
    update();
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
    final data = FormData.fromMap(
      {
        "certificate_file": file != null
            ? await MultipartFile.fromFile(
                file.files[0].path.toString(),
              )
            : null,
        'level': level,
        'field': field,
        'school': school,
        'start_date': startDate,
        'end_date': endDate,
      },
    );
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/education',
        data: data,
        options: Options(
          headers: {
            'Content-Type':
                'multipart/form-data; application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token',
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
        e.response!.data['errors'].toString(),
      );
    }
  }
}
