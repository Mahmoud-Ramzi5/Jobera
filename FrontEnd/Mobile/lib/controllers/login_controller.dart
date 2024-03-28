import 'package:dio/dio.dart';
import 'package:get/get.dart' hide Response;
import 'package:jobera/main.dart';

class LoginController extends GetxController {
  bool passwordToggle = true;
  bool remeberMe = true;
  bool isLoggedIn = false;
  var dio = Dio();

  void togglePassword(bool passwordToggle) {
    this.passwordToggle = !this.passwordToggle;
    update();
  }

  void toggleRemeberMe(bool rememberMe) {
    remeberMe = !remeberMe;
    update();
  }

  Future<dynamic> login(
    String email,
    String password,
    //bool rememberMe,
  ) async {
    // String rememberMeString;
    // if (rememberMe) {
    //   rememberMeString = "rememberMe";
    // } else {
    //   rememberMeString = "";
    // }
    try {
      var response = await dio.post('http://10.0.2.2:8000/api/login',
          data: {"email": email, "password": password},
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'connection': 'keep-alive',
              'Accept-Encoding': 'gzip, deflate, br',
            },
          ));
      if (response.statusCode == 200) {
        sharedPreferences?.setString(
          "access_token",
          response.data["access_token"].toString(),
        );
        isLoggedIn = true;
        return null;
      }
    } on DioException catch (e) {
      return e.response?.data["errors"].toString();
    }
  }
}
