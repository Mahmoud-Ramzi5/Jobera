import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/controllers/profileControllers/portofolio/edit_portofolio_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/skill.dart';

class AddPortofolioController extends GetxController {
  late GlobalKey<FormState> formField;
  late EditPortofolioController portofolioController;
  late GeneralController generalController;
  late TextEditingController titleController;
  late TextEditingController descriptionController;
  late TextEditingController linkController;
  late XFile? image;
  late FilePickerResult? files;
  List<Skill> selectedSkills = [];
  List<Skill> skills = [];
  Uint8List displayImage = Uint8List(0);
  late Dio dio;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    portofolioController = Get.find<EditPortofolioController>();
    generalController = Get.find<GeneralController>();
    titleController = TextEditingController();
    descriptionController = TextEditingController();
    linkController = TextEditingController();
    image = null;
    files = const FilePickerResult([]);
    dio = Dio();
    skills = await generalController.getAllSkills();
    update();
    super.onInit();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await generalController.searchSkills(value);
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
      Dialogs().showErrorDialog('Error', 'Max 5 skills per portofolio');
    }
  }

  void deleteSkill(Skill skill) {
    selectedSkills.remove(skill);
    skills.add(skill);
    update();
  }

  void removeFile(PlatformFile file) {
    files!.files.remove(file);
    update();
  }

  Future<void> addPhoto() async {
    image = await generalController.pickPhotoFromGallery();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  Future<void> takePhoto() async {
    image = await generalController.takePhotoFromCamera();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  Future<void> addPortofolio(
    String title,
    String description,
    String link,
    XFile? image,
    List<Skill> skills,
    FilePickerResult? files,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (skills.isNotEmpty) {
      if (files != null && files.count > 5) {
        files.files.removeRange(5, files.files.length);
      }

      final data = FormData.fromMap(
        {
          'title': title,
          'description': description,
          'link': link,
        },
      );

      if (image != null) {
        data.files.add(
          MapEntry(
            'photo',
            await MultipartFile.fromFile(image.path),
          ),
        );
      }

      for (int i = 0; i < files!.count; i++) {
        data.files.add(
          MapEntry(
            'files[$i]',
            await MultipartFile.fromFile(
              files.files[i].path.toString(),
            ),
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
          'http://192.168.43.23:8000/api/portfolio/add',
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
          portofolioController.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response.toString(),
        );
      }
    } else {
      Dialogs().showErrorDialog(
        'Error',
        'Must select at least 1 skill',
      );
    }
  }
}
