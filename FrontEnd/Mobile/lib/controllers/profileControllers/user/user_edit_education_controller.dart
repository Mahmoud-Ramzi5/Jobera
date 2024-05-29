import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';

class UserEditEducationController extends GetxController {
  late UserProfileController profileController;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late List<String> levels;
  late String selectedLevel;
  late TextEditingController editFieldController;
  late TextEditingController editSchoolController;
  late DateTime startDate;
  late DateTime endDate;

  @override
  void onInit() {
    profileController = Get.find<UserProfileController>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    levels = [
      'Bachelor',
      'Master',
      'PHD',
      'High School Diploma',
      'High Institute',
    ];
    selectedLevel = profileController.user.education.level;
    editFieldController =
        TextEditingController(text: profileController.user.education.field);
    editSchoolController =
        TextEditingController(text: profileController.user.education.school);
    startDate = DateTime(
      int.parse(
        profileController.user.education.startDate.substring(0, 4),
      ),
      int.parse(
        profileController.user.education.startDate.substring(8, 10),
      ),
      int.parse(
        profileController.user.education.startDate.substring(6, 7),
      ),
    );
    endDate = DateTime(
      int.parse(
        profileController.user.education.endDate.substring(0, 4),
      ),
      int.parse(
        profileController.user.education.endDate.substring(6, 7),
      ),
      int.parse(
        profileController.user.education.endDate.substring(8, 10),
      ),
    );
    super.onInit();
  }

  @override
  void onClose() {
    editFieldController.dispose();
    editSchoolController.dispose();
    super.onClose();
  }

  void selectLevel(String level) {
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
}
