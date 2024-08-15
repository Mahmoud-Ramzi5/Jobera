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
import 'package:jobera/models/portfolio.dart';
import 'package:jobera/models/portfolio_file.dart';
import 'package:jobera/models/skill.dart';

class EditPortfolioController extends GetxController {
  late Dio dio;
  late SettingsController settingsController;
  late ViewPortfolioController portfolioController;
  late GlobalKey<FormState> formField;
  Portfolio portfolio = Portfolio.empty();
  TextEditingController editTitleController = TextEditingController();
  TextEditingController editDescriptionController = TextEditingController();
  TextEditingController editLinkController = TextEditingController();
  String? imagePath;
  bool hasImage = false;
  List<Skill> usedSkills = [];
  List<Skill> skills = [];
  List<dynamic> files = [];
  XFile? image;
  Uint8List displayImage = Uint8List(0);
  FilePickerResult? pickedFiles;
  bool loading = true;

  @override
  Future<void> onInit() async {
    dio = Dio();
    settingsController = Get.find<SettingsController>();
    portfolioController = Get.find<ViewPortfolioController>();
    formField = GlobalKey<FormState>();
    portfolio = await fetchPortfolio(portfolioController.id);
    editTitleController.text = portfolio.title;
    editDescriptionController.text = portfolio.description;
    editLinkController.text = portfolio.link;
    imagePath = portfolio.photo;
    if (imagePath != null) {
      hasImage = true;
    }
    usedSkills = portfolio.skills;
    skills = await settingsController.getAllSkills();
    for (var file in portfolio.files) {
      files.add(file);
    }
    loading = false;
    update();
    super.onInit();
  }

  Future<dynamic> fetchPortfolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/portfolio/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        return portfolio = Portfolio.fromJson(response.data['portfolio']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await settingsController.searchSkills(value);
    skills.removeWhere(
        (item) => usedSkills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  void addToOMySkills(Skill skill) {
    if (usedSkills.length < 5) {
      usedSkills.add(skill);
      skills.remove(skill);
      update();
    } else {
      Dialogs().showErrorDialog('153'.tr, '166'.tr);
    }
  }

  void deleteSkill(Skill skill) {
    usedSkills.remove(skill);
    skills.add(skill);
    update();
  }

  Future<void> addFiles() async {
    pickedFiles = await settingsController.pickFiles();
    if (pickedFiles != null) {
      for (var i = 0; i < pickedFiles!.count; i++) {
        files.add(pickedFiles!.files[i]);
      }
    }

    update();
  }

  void removeFile(int index) {
    files.removeAt(index);
    update();
  }

  Future<void> addPhoto() async {
    image = await settingsController.pickPhotoFromGallery();
    if (image != null) {
      hasImage = false;
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  Future<void> takePhoto() async {
    image = await settingsController.takePhotoFromCamera();
    if (image != null) {
      hasImage = false;
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  void removePhoto() {
    if (hasImage) {
      hasImage = false;
    } else {
      image = null;
    }
    update();
  }

  Future<void> editPortfolio(
    int id,
    String title,
    String description,
    String link,
    XFile? image,
    List<Skill> skills,
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
      if (files.isNotEmpty) {
        if (files.length > 5) {
          files.removeRange(5, files.length);
        }
        for (int i = 0; i < files.length; i++) {
          if (files[i] is PortfolioFile) {
            var fileBytes =
                await settingsController.downloadFile(files[i].path);
            data.files.add(
              MapEntry(
                'files[$i]',
                MultipartFile.fromBytes(
                  fileBytes,
                  filename: files[i].name,
                ),
              ),
            );
          } else if (files[i] is PlatformFile) {
            data.files.add(
              MapEntry(
                'files[$i]',
                await MultipartFile.fromFile(
                  files[i].path!,
                  filename: files[i].name,
                ),
              ),
            );
          }
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
          'http://192.168.39.51:8000/api/portfolio/edit/$id',
          data: data,
          options: Options(
            headers: {
              'Content-Type': 'multipart/form-data; charset=UTF-8',
              'Accept': "application/json",
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 200) {
          Get.back();
          portfolioController.refreshIndicatorKey.currentState!.show();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
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
