import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/certificate.dart';

class UserEditCertificatesController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late GlobalKey<FormState> formField;
  List<Certificate> certificates = [];
  late GeneralController generalController;
  late TextEditingController editNameController;
  late TextEditingController editOrganizationController;
  late DateTime editDate;
  late UserProfileController profileController;
  String? editFileName;
  FilePickerResult? editfile;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    generalController = Get.find<GeneralController>();
    await fetchCertificates();
    editNameController = TextEditingController();
    editOrganizationController = TextEditingController();
    editDate = DateTime.now();
    if (!generalController.isInRegister) {
      profileController = Get.find<UserProfileController>();
    }
    super.onInit();
  }

  @override
  void onClose() {
    editNameController.dispose();
    editOrganizationController.dispose();
    super.onClose();
  }

  void goBack() {
    profileController.refreshIndicatorKey.currentState!.show();
    Get.back();
  }

  void startEdit(Certificate certificate) {
    editNameController.text = certificate.name;
    editOrganizationController.text = certificate.organization;
    List<String> parts = certificate.date.split('-');
    int day1 = int.parse(parts[0]);
    int month1 = int.parse(parts[1]);
    int year1 = int.parse(parts[2]);
    editDate = DateTime(year1, month1, day1);
    editFileName = Uri.file(
      certificate.file.toString(),
    ).pathSegments.last;
  }

  Future<void> addFile() async {
    editfile = await generalController.pickFile();
    updateName();
  }

  void updateName() {
    if (editfile != null) {
      editFileName = editfile!.files[0].name;
    }
    update();
  }

  Future<dynamic> fetchCertificates() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.7:8000/api/certificates',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        certificates = [
          for (var certificate in response.data['certificates'])
            (Certificate.fromJson(certificate)),
        ];
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now(),
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null && picked != editDate) {
      editDate = picked;
      update();
    }
  }

  Future<void> deleteCertificate(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.1.7:8000/api/certificates/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 204) {
        refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> editCertificate(
    int id,
    String name,
    String organization,
    DateTime date,
    String fileName,
    FilePickerResult? file,
  ) async {
    String newDate = '${date.day}-${date.month}-${date.year}';
    dynamic newfile = fileName;
    String? token = sharedPreferences?.getString('access_token');
    if (file != null) {
      newfile = await MultipartFile.fromFile(
        file.files[0].path.toString(),
      );
    }
    final data = FormData.fromMap(
      {
        "file": newfile,
        'name': name,
        'organization': organization,
        'release_date': newDate,
      },
    );
    try {
      var response = await dio.post(
        'http://192.168.1.7:8000/api/certificate/edit/$id',
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
        refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
