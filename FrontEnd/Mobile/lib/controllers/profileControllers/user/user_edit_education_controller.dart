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
  late GeneralController generalController;
  late Dio dio;
  late GlobalKey<FormState> formField;
  late Map<String, String> levels;
  Education? education;
  String? selectedLevel;
  TextEditingController editFieldController = TextEditingController();
  TextEditingController editSchoolController = TextEditingController();
  DateTime startDate = DateTime.now();
  DateTime endDate = DateTime.now();
  String? certficateName;
  FilePickerResult? file;

  @override
  Future<void> onInit() async {
    profileController = Get.find<UserProfileController>();
    generalController = Get.find<GeneralController>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    levels = {
      'Bachelor': 'BACHELOR',
      'Master': 'MASTER',
      'PHD': 'PHD',
      'High School Diploma': 'HIGH_SCHOOL_DIPLOMA',
      'High Institute': 'HIGH_INSTITUTE',
    };
    if (!generalController.isInRegister) {
      await fetchEducation();
      selectedLevel = education!.level;
      editFieldController = TextEditingController(text: education!.field);
      editSchoolController = TextEditingController(text: education!.school);
      List<String> parts1 = education!.startDate.split('-');
      int day1 = int.parse(parts1[0]);
      int month1 = int.parse(parts1[1]);
      int year1 = int.parse(parts1[2]);
      startDate = DateTime(year1, month1, day1);
      List<String> parts2 = education!.endDate.split('-');
      int day2 = int.parse(parts2[0]);
      int month2 = int.parse(parts2[1]);
      int year2 = int.parse(parts2[2]);
      endDate = DateTime(year2, month2, day2);
      certficateName = education!.certificateFile == null
          ? 'No file'
          : Uri.file(
              education!.certificateFile.toString(),
            ).pathSegments.last;
      file = null;
      update();
    }
    super.onInit();
  }

  @override
  void onClose() {
    editFieldController.dispose();
    editSchoolController.dispose();
    super.onClose();
  }

  Future<void> selectLevel(String level) async {
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

  Future<dynamic> fetchEducation() async {
    String? token = sharedPreferences?.getString('access_token');

    try {
      var response = await dio.get(
        'http://192.168.43.23:8000/api/education',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        education = Education.fromJson(
          response.data['education'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> editEducation(
    String level,
    String field,
    String school,
    DateTime startDate,
    DateTime endDate,
    FilePickerResult? file,
  ) async {
    String newStartDate =
        '${startDate.day}-${startDate.month}-${startDate.year}';
    String newEndDate = '${endDate.day}-${endDate.month}-${endDate.year}';
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
        'start_date': newStartDate,
        'end_date': newEndDate,
      },
    );
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/education',
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
        if (generalController.isInRegister) {
          Get.offAllNamed('/userViewCertificates');
        } else {
          Get.back();
          profileController.refreshIndicatorKey.currentState!.show();
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> advanceRegisterStep() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      final response = await dio.post(
        'http://192.168.43.23:8000/api/regStep',
        options: Options(
            responseType: ResponseType.bytes, // important
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': "application/json",
              'Authorization': 'Bearer $token'
            }),
      );
      if (response.statusCode == 200) {
        await editEducation(
          selectedLevel.toString(),
          editFieldController.text,
          editSchoolController.text,
          startDate,
          endDate,
          file,
        );
        Get.offAllNamed('/userViewCertificates');
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
