import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/skill_types.dart';
import 'package:jobera/models/skills.dart';
import 'package:jobera/models/user.dart';

class UserEditSkillsController extends GetxController {
  late UserProfileController profileController;
  late User user;
  late GeneralController generalController;
  late Dio dio;
  late List<Skills> myskills = [];
  late List<SkillTypes> skillTypes = [];
  late List<Skills> skills = [];

  @override
  void onInit() async {
    profileController = Get.find<UserProfileController>();
    user = profileController.user;
    generalController = Get.find<GeneralController>();
    dio = Dio();
    myskills = user.skills;
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

  void deleteSkill(Skills skill) {
    myskills.remove(skill);
    update();
  }

  void addToOMySkills(Skills skill) {
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
    List<int> skillIds = [];
    for (var i = 0; i < myskills.length; i++) {
      skillIds.add(myskills[i].id);
    }
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/user/skills/edit',
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
