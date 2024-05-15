import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/main.dart';

class AuthController extends GetxController {
  late Dio dio;

  @override
  onInit() {
    dio = Dio();
    super.onInit();
  }

  Future<bool> checkToken() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get('http://10.0.2.2:8000/api/isExpired',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ));
      if (response.statusCode == 200) {
        return true;
      }
    } on DioException {
      return false;
    }
    return false;
  }
}
