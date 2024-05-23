import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';

class HomeController extends GetxController {
  late Dio dio;
  late bool isCompany;
  late String name;
  late String email;

  @override
  void onInit() {
    dio = Dio();
    name = '';
    email = '';
    isCompany = false;
    super.onInit();
  }

  @override
  onReady() async {
    await fetchUser();
  }

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
          name = response.data['user']['name'];
          email = response.data['user']['email'];
          isCompany = true;
        } else if (response.data['user']['type'] == 'individual') {
          name = response.data['user']['full_name'];
          email = response.data['user']['email'];
          isCompany = false;
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data.toString(),
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
        e.response!.data.toString(),
      );
    }
  }
}
