import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:jobera/models/user.dart';

class HomeController extends GetxController {
  late Dio dio;
  late bool isCompany;
  User? user;
  Company? company;

  @override
  Future<void> onInit() async {
    dio = Dio();
    await fetchUser();
    super.onInit();
  }

  // @override
  // void onClose() {
  //   super.onClose();
  // }

  Future<void> fetchUser() async {
    String? token = sharedPreferences?.getString('access_token');
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
          user = null;
          isCompany = true;
        } else if (response.data['user']['type'] == 'individual') {
          user = User.fromJson(response.data['user']);
          company = null;
          isCompany = false;
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data["errors"].toString(),
      );
    }
  }

  Future<void> logout() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post('http://10.0.2.2:8000/api/logout',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        sharedPreferences?.remove('access_token');
        await Dialogs().showSuccessDialog('Logout Successfull', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/login');
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Logout Failed',
        e.response!.data["errors"].toString(),
      );
    }
  }
}
