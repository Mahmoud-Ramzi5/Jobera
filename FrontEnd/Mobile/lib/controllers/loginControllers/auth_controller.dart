import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/enums.dart';
import 'package:jobera/main.dart';

class AuthController extends GetxController {
  late Dio dio;

  @override
  onInit() {
    dio = Dio();
    dio.options.connectTimeout = const Duration(seconds: 5);
    super.onInit();
  }

  Future<MiddlewareCases> checkToken() async {
    String? token = sharedPreferences?.getString('access_token');
    print(token);
    if (token != null) {
      try {
        var response = await dio.get(
          'http://192.168.0.106:8000/api/isExpired',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ),
        );
        if (response.statusCode == 200) {
          return MiddlewareCases.validToken;
        }
      } on DioException catch (e) {
        switch (e.type) {
          case DioExceptionType.badResponse:
            if (e.response!.statusCode == 401) {
              Future.delayed(
                const Duration(seconds: 1),
                () {
                  Dialogs().showSesionExpiredDialog();
                },
              );
            }
          case DioExceptionType.connectionTimeout:
            return MiddlewareCases.invalidToken;
          default:
            return MiddlewareCases.invalidToken;
        }
      }
    }
    return MiddlewareCases.noToken;
  }
}
