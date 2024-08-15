import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/education.dart';

class UserEditEducationController extends GetxController {
  late UserProfileController? profileController;
  late SettingsController settingsController;
  late Dio dio;
  late GlobalKey<FormState> formField;
  late Map<String, String> levels;
  late Education education;
  String? selectedLevel;
  TextEditingController editFieldController = TextEditingController();
  TextEditingController editSchoolController = TextEditingController();
  DateTime startDate = DateTime.now();
  DateTime endDate = DateTime.now();
  String? certficateName;
  FilePickerResult? file;
  bool loading = true;

  @override
  Future<void> onInit() async {
    profileController = null;
    settingsController = Get.find<SettingsController>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    levels = {
      '177'.tr: 'BACHELOR',
      '178'.tr: 'MASTER',
      '179'.tr: 'PHD',
      '180'.tr: 'HIGH_SCHOOL_DIPLOMA',
      '181'.tr: 'HIGH_INSTITUTE',
    };
    education = Education.empty();
    if (!settingsController.isInRegister) {
      profileController = Get.find<UserProfileController>();
      await fetchEducation();
      selectedLevel = education.level;
      editFieldController = TextEditingController(text: education.field);
      editSchoolController = TextEditingController(text: education.school);
      startDate = education.startDate;
      endDate = education.endDate;
      certficateName = education.certificateFile == null
          ? null
          : Uri.file(
              education.certificateFile.toString(),
            ).pathSegments.last;
      file = null;
    }
    loading = false;
    update();
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

  Future<void> addFile() async {
    file = await settingsController.pickFile();
    updateName();
  }

  void updateName() {
    if (file != null) {
      certficateName = file!.files[0].name;
    }
    update();
  }

  void removeFile() {
    file = null;
    certficateName = null;
    update();
    Get.back();
  }

  Future<void> fetchEducation() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.106:8000/api/education',
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
        education = Education.fromJson(response.data['education']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
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
    String? token = sharedPreferences?.getString('access_token');
    final data = FormData.fromMap(
      {
        "certificate_file": certficateName != null
            ? file != null
                ? await MultipartFile.fromFile(
                    file.files[0].path.toString(),
                  )
                : certficateName
            : null,
        'level': level,
        'field': field,
        'school': school,
        'start_date': startDate.toString().split(' ')[0],
        'end_date': endDate.toString().split(' ')[0],
      },
    );
    try {
      var response = await dio.post(
        'http://192.168.1.106:8000/api/education',
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

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (settingsController.isInRegister) {
          Get.offAllNamed('/userViewCertificates');
        } else {
          profileController!.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }
}
