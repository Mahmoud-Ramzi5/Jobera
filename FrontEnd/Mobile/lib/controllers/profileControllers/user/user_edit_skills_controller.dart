import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/models/skill_types.dart';
import 'package:jobera/models/skills.dart';

class UserEditSkillsController extends GetxController {
  late UserProfileController profileController;
  late Dio dio;
  late List<Skills> myskills;
  late List<SkillTypes> skillTypes = [];
  late List<Skills> skills = [];

  @override
  void onInit() async {
    profileController = Get.find<UserProfileController>();
    dio = Dio();
    myskills = profileController.user.skills;
    super.onInit();
  }

  @override
  Future<void> onReady() async {
    await getSkillTypes();
    super.onReady();
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

  Future<dynamic> getSkillTypes() async {
    try {
      var response = await dio.get(
        'http://10.0.2.2:8000/api/skills/types',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        skillTypes = SkillTypes.fromJsonList(response.data['types']);

        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data.toString(),
      );
    }
  }

  Future<dynamic> getSkills(String type) async {
    try {
      var response = await dio.get(
        'http://10.0.2.2:8000/api/skills?type[eq]=$type',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        skills = Skills.fromJsonList(response.data['skills']);
        skills.removeWhere(
            (item) => myskills.any((mySkill) => item.name == mySkill.name));
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data.toString(),
      );
    }
  }
}
