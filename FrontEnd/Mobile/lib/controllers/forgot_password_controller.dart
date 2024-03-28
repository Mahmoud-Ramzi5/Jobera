import 'package:dio/dio.dart';
import 'package:get/get.dart';

class ForgotPasswordController extends GetxController {
  bool isEmailSentSuccessfully = false;
  var dio = Dio();

  Future<dynamic> forgotPassword(
    String email,
  ) async {
    try {
      var response =
          await dio.post('http://10.0.2.2:8000/api/password/reset-link',
              data: {"email": email},
              options: Options(
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json',
                  'connection': 'keep-alive',
                  'Accept-Encoding': 'gzip, deflate, br',
                },
              ));
      if (response.statusCode == 200) {
        isEmailSentSuccessfully = true;
        return response.data["message"].toString();
      }
    } on DioException catch (e) {
      isEmailSentSuccessfully = false;
      return e.response?.data["errors"].toString();
    }
  }
}
