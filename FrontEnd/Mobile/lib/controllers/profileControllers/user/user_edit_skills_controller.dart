import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/skill_type.dart';
import 'package:jobera/models/skill.dart';

class UserEditSkillsController extends GetxController {
  late SettingsController settingsController;
  late UserProfileController? profileController;
  late Dio dio;
  List<Skill> myskills = [];
  late List<SkillType> skillTypes = [];
  List<Skill> skills = [];
  bool loading = true;

  @override
  void onInit() async {
    settingsController = Get.find<SettingsController>();
    profileController = null;
    dio = Dio();
    if (!settingsController.isInRegister) {
      profileController = Get.find<UserProfileController>();
      await fetchSkills();
    }
    skillTypes = await settingsController.getSkillTypes();
    loading = false;
    update();
    super.onInit();
  }

  void deleteSkill(Skill skill) {
    myskills.remove(skill);
    update();
  }

  void addToOMySkills(Skill skill) {
    myskills.add(skill);
    skills.remove(skill);
    update();
  }

  Future<void> getSkills(String type) async {
    skills = await settingsController.getSkills(type);
    skills.removeWhere(
        (item) => myskills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await settingsController.searchSkills(value);
    skills.removeWhere(
        (item) => myskills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  Future<dynamic> fetchSkills() async {
    String? token = sharedPreferences?.getString('access_token');

    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/user/skills',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        myskills = [
          for (var skill in response.data['skills']) (Skill.fromJson(skill)),
        ];
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<dynamic> editSkills() async {
    String? token = sharedPreferences?.getString('access_token');
    if (myskills.isEmpty) {
      Dialogs().showErrorDialog('Error', 'One or more skills required');
    } else {
      List<int> skillIds = [];
      for (var i = 0; i < myskills.length; i++) {
        skillIds.add(myskills[i].id);
      }
      try {
        var response = await dio.post(
          'http://192.168.0.101:8000/api/user/skills/edit',
          data: {
            'skills': skillIds,
          },
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ),
        );
        if (response.statusCode == 200) {
          Get.back();
          profileController!.refreshIndicatorKey.currentState!.show();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
        );
      }
    }
  }

  Future<dynamic> addSkills() async {
    String? token = sharedPreferences?.getString('access_token');
    if (myskills.isEmpty) {
      Dialogs().showErrorDialog('Error', 'One or more skills required');
    } else {
      List<int> skillIds = [];
      for (var i = 0; i < myskills.length; i++) {
        skillIds.add(myskills[i].id);
      }
      try {
        var response = await dio.post(
          'http://192.168.0.101:8000/api/user/skills/add',
          data: {
            'skills': skillIds,
          },
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ),
        );
        if (response.statusCode == 200) {
          Get.offAllNamed('/userEditEducation');
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
        );
      }
    }
  }
}
