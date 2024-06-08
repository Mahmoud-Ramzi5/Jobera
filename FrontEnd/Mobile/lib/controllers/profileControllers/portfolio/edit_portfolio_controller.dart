import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/portfolio.dart';
import 'package:jobera/models/skill.dart';

class EditPortfolioController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late Dio dio;
  late GlobalKey<FormState> formField;
  List<Portfolio> portoflios = [];
  Portfolio? editPortfolio;
  TextEditingController editTitleController = TextEditingController();
  TextEditingController editDescriptionController = TextEditingController();
  TextEditingController editLinkController = TextEditingController();
  String? imagePath;
  bool hasImage = false;
  List<Skill> usedSkills = [];
  List<Skill> skills = [];
  XFile? image;
  Uint8List displayImage = Uint8List(0);
  FilePickerResult? files;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    dio = Dio();
    formField = GlobalKey<FormState>();

    await fetchPortfolios();
    super.onInit();
  }

  Future<dynamic> fetchPortfolios() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.2:8000/api/portfolios',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        portoflios = [
          for (var portofolio in response.data['portfolios'])
            Portfolio.fromJson(
              {
                ...portofolio,
                'files': portofolio['files'] ?? [],
              },
            ),
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

  Future<void> deletePortfolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.1.2:8000/api/portfolios/$id',
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

  Future<void> fetchPortfolio(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.2:8000/api/portfolio/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        editPortfolio = Portfolio.fromJson(response.data['portfolio']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> startEdit(int id) async {
    await fetchPortfolio(id);
    if (editPortfolio?.photo != null) {
      hasImage = true;
    }
    editTitleController.text = editPortfolio!.title;
    editDescriptionController.text = editPortfolio!.description;
    editLinkController.text = editPortfolio!.link;
    usedSkills = editPortfolio!.skills;
    skills = await generalController.getAllSkills();
    update();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await generalController.searchSkills(value);
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
      Dialogs().showErrorDialog('Error', 'Max 5 skills per portfolio');
    }
  }

  void deleteSkill(Skill skill) {
    usedSkills.remove(skill);
    skills.add(skill);
    update();
  }

  Future<void> addFiles() async {
    files = await generalController.pickFiles();
    update();
  }

  void removeFile(int index) {
    editPortfolio?.files?.removeAt(index);
    update();
    if (files?.files != null && files!.files.length > index) {
      files!.files.removeAt(index);
    }
  }

  Future<void> addPhoto() async {
    image = await generalController.pickPhotoFromGallery();
    if (image != null) {
      hasImage = false;
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  Future<void> takePhoto() async {
    image = await generalController.takePhotoFromCamera();
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
}
