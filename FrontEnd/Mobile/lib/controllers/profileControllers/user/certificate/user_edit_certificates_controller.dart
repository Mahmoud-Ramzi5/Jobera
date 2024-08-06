import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/certificate.dart';

class UserEditCertificatesController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late GlobalKey<FormState> formField;
  late SettingsController settingsController;
  late HomeController homeController;
  late TextEditingController editNameController;
  late TextEditingController editOrganizationController;
  late DateTime editDate;
  late UserProfileController userProfileController;
  List<Certificate> certificates = [];
  String? editFileName;
  FilePickerResult? editfile;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    settingsController = Get.find<SettingsController>();
    editNameController = TextEditingController();
    editOrganizationController = TextEditingController();
    editDate = DateTime.now();
    homeController = Get.put(HomeController());
    if (!settingsController.isInRegister) {
      homeController = Get.find<HomeController>();
      if (homeController.isOtherUserProfile) {
        await fetchCertificates(
          homeController.otherUserId,
          homeController.otherUserName,
        );
      } else {
        userProfileController = Get.find<UserProfileController>();
        await fetchCertificates(
          userProfileController.user.id,
          userProfileController.user.name,
        );
      }
    }
    loading = false;
    update();
    super.onInit();
  }

  @override
  void onClose() {
    editNameController.dispose();
    editOrganizationController.dispose();
    super.onClose();
  }

  void goBack() {
    if (!homeController.isOtherUserProfile) {
      userProfileController.refreshIndicatorKey.currentState!.show();
    }
    Get.back();
  }

  void startEdit(Certificate certificate) {
    editNameController.text = certificate.name;
    editOrganizationController.text = certificate.organization;
    editDate = certificate.date;
    editFileName = Uri.file(
      certificate.file.toString(),
    ).pathSegments.last;
  }

  Future<void> addFile() async {
    editfile = await settingsController.pickFile();
    updateName();
  }

  void updateName() {
    if (editfile != null) {
      editFileName = editfile!.files[0].name;
    }
    update();
  }

  Future<dynamic> fetchCertificates(int userId, String userName) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/certificates/$userId/$userName',
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
        'http://192.168.0.107:8000/api/certificates/$id',
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
        'release_date': date.toString().split(' ')[0],
      },
    );
    try {
      var response = await dio.post(
        'http://192.168.0.107:8000/api/certificate/edit/$id',
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
