import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:jobera/models/user.dart';

class ProfileController extends GetxController {
  late Dio dio;
  late Company company;
  late User user;

  @override
  Future<void> onInit() async {
    dio = Dio();
    company = Company.empty();
    user = User.empty();
    await fetchProfile();
    super.onInit();
  }

  Future<void> fetchProfile() async {
    String? token = sharedPreferences?.getString('access_token');
    Dio dio = Dio();
    try {
      var response = await dio.get('http://10.0.2.2:8000/api/profile',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        if (response.data['user']['type'] == 'company') {
          company = Company.fromJson(response.data['user']);
          update();
        } else if (response.data['user']['type'] == 'individual') {
          user = User.fromJson(response.data['user']);
          update();
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data["errors"].toString(),
      );
    }
  }
}
