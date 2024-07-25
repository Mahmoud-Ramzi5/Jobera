import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/appControllers/general_controller.dart';
import 'package:jobera/controllers/profileControllers/profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/education.dart';

class UserEditEducationController extends GetxController {
  late ProfileController? profileController;
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
  bool loading = true;

  @override
  Future<void> onInit() async {
    profileController = null;
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
      profileController = Get.find<ProfileController>();
      education = profileController!.user.education;
      selectedLevel = education!.level;
      editFieldController = TextEditingController(text: education!.field);
      editSchoolController = TextEditingController(text: education!.school);
      startDate = DateTime.parse(education!.startDate);
      endDate = DateTime.parse(education!.endDate);
      certficateName = education!.certificateFile == null
          ? null
          : Uri.file(
              education!.certificateFile.toString(),
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
    file = await generalController.pickFile();
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
    certficateName = 'No file';
    update();
    Get.back();
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
        "certificate_file": file != null
            ? await MultipartFile.fromFile(
                file.files[0].path.toString(),
              )
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
      if (response.statusCode == 200 || response.statusCode == 201) {
        if (generalController.isInRegister) {
          Get.offAllNamed('/userViewCertificates');
        } else {
          Get.back();
          profileController!.refreshIndicatorKey.currentState!.show();
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
