import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/skill_types.dart';
import 'package:jobera/models/skills.dart';
import 'package:jobera/models/states.dart';

class ServiceController extends GetxController {
  late Dio dio;

  @override
  void onInit() {
    dio = Dio();
    super.onInit();
  }

  Future<dynamic> getCountries() async {
    try {
      var response = await dio.get(
        'http://10.0.2.2:8000/api/countries',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Countries.fromJsonList(
          response.data['countries'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['message'].toString(),
      );
    }
  }

  Future<dynamic> getStates(String countryName) async {
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/states',
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
        'Error',
        e.response!.data['message'].toString(),
      );
    }
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
        return SkillTypes.fromJsonList(response.data['types']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
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
        return Skills.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> searchSkills(String name) async {
    try {
      var response = await dio.get(
        'http://10.0.2.2:8000/api/skills?name[like]=$name',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Skills.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
