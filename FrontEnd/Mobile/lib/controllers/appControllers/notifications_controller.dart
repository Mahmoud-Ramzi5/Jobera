import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';

class NotificationsController extends GetxController {
  late Dio dio;

  @override
  Future<void> onInit() async {
    dio = Dio();
    await fetchNotifications();
    super.onInit();
  }

  Future<dynamic> fetchNotifications() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/notifications',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        print(response.data.toString());
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
