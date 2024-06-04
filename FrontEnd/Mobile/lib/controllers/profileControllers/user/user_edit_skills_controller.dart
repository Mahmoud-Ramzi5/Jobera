import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/skill_type.dart';
import 'package:jobera/models/skill.dart';

class UserEditSkillsController extends GetxController {
  late UserProfileController profileController;
  late GeneralController generalController;
  late Dio dio;
  late List<Skill> myskills = [];
  late List<SkillType> skillTypes = [];
  late List<Skill> skills = [];

  @override
  void onInit() async {
    profileController = Get.find<UserProfileController>();

    generalController = Get.find<GeneralController>();
    dio = Dio();
    myskills = profileController.user.skills;
    skillTypes = await generalController.getSkillTypes();
    update();
    super.onInit();
  }

  @override
  void onClose() {
    myskills = [];
    update();
    super.onClose();
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
    skills = await generalController.getSkills(type);
    skills.removeWhere(
        (item) => myskills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await generalController.searchSkills(value);
    skills.removeWhere(
        (item) => myskills.any((mySkill) => item.name == mySkill.name));
    update();
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
          'http://192.168.43.23:8000/api/user/skills/edit',
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
          profileController.refreshIndicatorKey.currentState!.show();
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
