import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/certificate.dart';

class UserEditCertificatesController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late GlobalKey<FormState> formField;
  List<Certificate> certificates = [];
  late GeneralController generalController;
  late TextEditingController newNameController;
  late TextEditingController newOrganizationController;
  late DateTime newDate;
  late String? newFileName;
  late FilePickerResult? file;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    formField = GlobalKey<FormState>();
    generalController = Get.find<GeneralController>();
    newNameController = TextEditingController();
    newOrganizationController = TextEditingController();
    newDate = DateTime.now();
    file = const FilePickerResult([]);
    newFileName = null;
    await fetchCertificates();
    super.onInit();
  }

  Future<dynamic> fetchCertificates() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/certificates',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
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
    if (picked != null && picked != newDate) {
      newDate = picked;
      update();
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

  Future<void> addCertificate(
    String name,
    String organization,
    String date,
    FilePickerResult? file,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (file!.files.isEmpty) {
      Dialogs().showErrorDialog('Error', 'File is Required');
    } else {
      final data = FormData.fromMap(
        {
          "file": await MultipartFile.fromFile(
            file.files[0].path.toString(),
          ),
          'name': name,
          'organization': organization,
          'release_date': date,
        },
      );
      try {
        var response = await dio.post(
          'http://192.168.0.105:8000/api/certificate/add',
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
          refreshIndicatorKey.currentState!.show();
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
