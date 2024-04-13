import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/views/login_view.dart';

class HomeController extends GetxController {
  late Dio dio;

  @override
  void onInit() {
    dio = Dio();
    super.onInit();
  }

  // @override
  // void onClose() {
  //   super.onClose();
  // }

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
        Dialogs().showSuccessDialog(
          'Success',
          response.data['message'].toString(),
        );
        Get.offAll(() => LoginView());
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Logout Failed',
        e.response!.data["errors"].toString(),
      );
    }
  }
}
