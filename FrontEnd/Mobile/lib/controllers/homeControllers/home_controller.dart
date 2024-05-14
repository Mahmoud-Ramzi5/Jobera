import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/user.dart';

class HomeController extends GetxController {
  late Dio dio;
  User user = User(
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    birthDate: '',
    gender: '',
    type: '',
  );

  @override
  Future<void> onInit() async {
    dio = Dio();
    user = await fetchUser();
    super.onInit();
  }

  // @override
  // void onClose() {
  //   super.onClose();
  // }

  Future<dynamic> fetchUser() async {
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
        print(response.data.toString());
        return User.fromJson(response.data['user']);
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
