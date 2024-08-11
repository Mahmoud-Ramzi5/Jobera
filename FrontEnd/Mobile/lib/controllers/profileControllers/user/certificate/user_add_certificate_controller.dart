import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/certificate/user_edit_certificates_controller.dart';
import 'package:jobera/main.dart';

class UserAddCertificateController extends GetxController {
  late GlobalKey<FormState> formField;
  late UserEditCertificatesController certificatesController;
  late SettingsController settingsController;
  late Dio dio;
  late TextEditingController nameController;
  late TextEditingController organizationController;
  late DateTime date;
  late String? fileName;
  late FilePickerResult? file;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    settingsController = Get.find<SettingsController>();
    certificatesController = Get.find<UserEditCertificatesController>();
    dio = Dio();
    nameController = TextEditingController();
    organizationController = TextEditingController();
    date = DateTime.now();
    file = const FilePickerResult([]);
    fileName = null;
    super.onInit();
  }

  @override
  onClose() {
    nameController.dispose();
    organizationController.dispose();
    super.onClose();
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now(),
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null && picked != date) {
      date = picked;
      update();
    }
  }

  Future<void> addFile() async {
    file = await settingsController.pickFile();
    updateName();
  }

  void updateName() {
    if (file != null) {
      fileName = file!.files[0].name;
    }
    update();
  }

  Future<void> addCertificate(
    String name,
    String organization,
    DateTime date,
    FilePickerResult? file,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (file == null) {
      Dialogs().showErrorDialog('Error', 'File is Required');
    } else {
      final data = FormData.fromMap(
        {
          "file": await MultipartFile.fromFile(
            file.files[0].path.toString(),
          ),
          'name': name,
          'organization': organization,
          'release_date': date.toString().split(' ')[0],
        },
      );
      try {
        var response = await dio.post(
          'http://192.168.1.108:8000/api/certificate/add',
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
        if (response.statusCode == 201) {
          certificatesController.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response.toString(),
        );
      }
    }
  }
}
