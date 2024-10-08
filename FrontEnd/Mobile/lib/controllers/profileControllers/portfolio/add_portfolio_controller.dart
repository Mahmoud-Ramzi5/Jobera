import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/portfolio/view_portfolio_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/skill.dart';

class AddPortfolioController extends GetxController {
  late GlobalKey<FormState> formField;
  late ViewPortfolioController portfolioController;
  late SettingsController settingsController;
  late TextEditingController titleController;
  late TextEditingController descriptionController;
  late TextEditingController linkController;
  late XFile? image;
  late FilePickerResult? files;
  List<Skill> selectedSkills = [];
  List<Skill> skills = [];
  Uint8List displayImage = Uint8List(0);
  late Dio dio;
  bool loading = true;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    portfolioController = Get.find<ViewPortfolioController>();
    settingsController = Get.find<SettingsController>();
    titleController = TextEditingController();
    descriptionController = TextEditingController();
    linkController = TextEditingController();
    image = null;
    files = const FilePickerResult([]);
    dio = Dio();
    skills = await settingsController.getAllSkills();
    loading = false;
    update();
    super.onInit();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await settingsController.searchSkills(value);
    skills.removeWhere(
        (item) => selectedSkills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  void addToOMySkills(Skill skill) {
    if (selectedSkills.length < 5) {
      selectedSkills.add(skill);
      skills.remove(skill);
      update();
    } else {
      Dialogs().showErrorDialog(
        '153'.tr,
        '166'.tr,
      );
    }
  }

  void deleteSkill(Skill skill) {
    selectedSkills.remove(skill);
    skills.add(skill);
    update();
  }

  Future<void> addFiles() async {
    files = await settingsController.pickFiles();
    update();
  }

  void removeFile(PlatformFile file) {
    files!.files.remove(file);
    update();
  }

  Future<void> addPhoto() async {
    image = await settingsController.pickPhotoFromGallery();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  Future<void> takePhoto() async {
    image = await settingsController.takePhotoFromCamera();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  void removePhoto() {
    image = null;
    update();
  }

  Future<void> addPortfolio(
    String title,
    String description,
    String link,
    XFile? image,
    List<Skill> skills,
    FilePickerResult? files,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (skills.isNotEmpty) {
      final data = FormData.fromMap(
        {
          'title': title,
          'description': description,
          'link': link,
        },
      );
      if (files != null) {
        if (files.count > 5) {
          files.files.removeRange(5, files.files.length);
        }
        for (int i = 0; i < files.count; i++) {
          data.files.add(
            MapEntry(
              'files[$i]',
              await MultipartFile.fromFile(
                files.files[i].path.toString(),
              ),
            ),
          );
        }
      }

      if (image != null) {
        data.files.add(
          MapEntry(
            'photo',
            await MultipartFile.fromFile(image.path),
          ),
        );
      }

      for (int i = 0; i < skills.length; i++) {
        data.fields.add(
          MapEntry(
            'skills[$i]',
            skills[i].id.toString(),
          ),
        );
      }
      try {
        var response = await dio.post(
          'http://192.168.0.106:8000/api/portfolio/add',
          data: data,
          options: Options(
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 201) {
          portfolioController.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          '153'.tr,
          e.response.toString(),
        );
      }
    } else {
      Dialogs().showErrorDialog(
        '153'.tr,
        '158'.tr,
      );
    }
  }
}
