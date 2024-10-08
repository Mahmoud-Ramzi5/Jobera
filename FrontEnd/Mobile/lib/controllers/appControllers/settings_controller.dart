import 'dart:io';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/themes.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/skill.dart';
import 'package:jobera/models/skill_type.dart';
import 'package:jobera/models/state.dart';
import 'package:open_filex/open_filex.dart';
import 'package:permission_handler/permission_handler.dart';

class SettingsController extends GetxController {
  late Dio dio;
  late ImagePicker picker;
  late bool isDarkMode;
  late ThemeData theme;
  late Locale locale;
  late String selectedLang;
  late Map<String, String> langs;
  bool isInRegister = false;

  @override
  void onInit() {
    dio = Dio();
    picker = ImagePicker();
    isDarkMode =
        sharedPreferences?.getBool('isDarkMode') == true ? true : false;
    theme = isDarkMode ? Themes.darkTheme : Themes.lightTheme;
    if (sharedPreferences?.getString("lang") != null) {
      if (sharedPreferences?.getString("lang") == "en") {
        locale = const Locale("en");
        selectedLang = 'en';
      } else {
        locale = const Locale("ar");
        selectedLang = 'ar';
      }
    } else {
      locale = const Locale('en');
      selectedLang = 'en';
    }
    langs = {
      'English': 'en',
      'العربية': 'ar',
    };
    super.onInit();
  }

  Future<void> changeLang(String lang) async {
    Locale locale = Locale(lang);
    selectedLang = lang;
    sharedPreferences?.setString("lang", lang);
    await Get.updateLocale(locale);
  }

  void changeTheme(bool currentValue) {
    isDarkMode = currentValue;
    if (isDarkMode) {
      Get.changeTheme(Themes.darkTheme);
    } else {
      Get.changeTheme(Themes.lightTheme);
    }
    saveTheme(isDarkMode);
    update();
  }

  void saveTheme(bool isDarkMode) {
    sharedPreferences?.setBool('isDarkMode', isDarkMode);
  }

  Future<void> requestPermissions() async {
    const cameraPermission = Permission.camera;
    const photoPermission = Permission.photos;
    const storagePermission = Permission.manageExternalStorage;
    const notificationsPermission = Permission.notification;
    if (await cameraPermission.isDenied) {
      await cameraPermission.request();
    }
    if (await photoPermission.isDenied) {
      await photoPermission.request();
    }
    if (await storagePermission.isDenied) {
      await storagePermission.request();
    }
    if (await notificationsPermission.isDenied) {
      await notificationsPermission.request();
    }
  }

  Future<dynamic> getCountries() async {
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/countries',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );

      if (response.statusCode == 200) {
        return Country.fromJsonList(
          response.data['countries'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> getStates(String countryName) async {
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/states',
        data: {"country_name": countryName},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return States.fromJsonList(
          response.data['states'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> getSkillTypes() async {
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/skills/types',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return SkillType.fromJsonList(response.data['types']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> getSkills(String type) async {
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/skills?type[eq]=$type',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Skill.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> getAllSkills() async {
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/skills',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        List<Skill> skills = [
          for (var skill in response.data['skills']) Skill.fromJson(skill)
        ];
        return skills;
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> searchSkills(String name) async {
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/skills?name[like]=$name',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Skill.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response!.data['erros'].toString(),
      );
    }
  }

  Future<dynamic> downloadFile(String fileName) async {
    try {
      final response = await dio.get(
        'http://192.168.0.106:8000/api/file/$fileName',
        options: Options(
          responseType: ResponseType.bytes, // important
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf; charset=UTF-8',
            'Accept': 'application/pdf',
            'Connection': 'Keep-Alive',
          },
        ),
      );
      if (response.statusCode == 200) {
        return response.data;
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<void> fetchFile(String fileName, String type) async {
    const permission = Permission.manageExternalStorage;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        openAppSettings();
      }
    } else if (await permission.isGranted) {
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
          dynamic fileData = await downloadFile(fileName);
          await file.writeAsBytes(fileData, flush: true);
          await OpenFilex.open(file.path);
        }
      }
    }
  }

  Future<FilePickerResult?> pickFile() async {
    FilePickerResult? file = await FilePicker.platform.pickFiles(
      allowMultiple: false,
      allowedExtensions: ['pdf'],
      type: FileType.custom,
    );
    return file;
  }

  Future<FilePickerResult?> pickFiles() async {
    FilePickerResult? file = await FilePicker.platform.pickFiles(
      allowMultiple: true,
      allowedExtensions: ['pdf'],
      type: FileType.custom,
    );
    return file;
  }

  Future<XFile?> pickPhotoFromGallery() async {
    const permission = Permission.photos;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      XFile? image;
      image = await picker.pickImage(
        source: ImageSource.gallery,
      );
      return image;
    }
    return null;
  }

  Future<XFile?> takePhotoFromCamera() async {
    const permission = Permission.camera;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      XFile? image;
      image = await picker.pickImage(
        source: ImageSource.camera,
      );
      return image;
    }
    return null;
  }

  Future<dynamic> verifyEmail() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/auth/verify',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );

      if (response.statusCode == 200) {
        Dialogs().showSuccessDialog('155'.tr, '192'.tr);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }
}
