import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/chat.dart';
import 'package:jobera/models/chats.dart';

class ChatsController extends GetxController {
  late Dio dio;
  late HomeController homeController;
  List<Chats> chats = [];
  bool loading = true;
  Chat chat = Chat.empty();

  @override
  Future<void> onInit() async {
    dio = Dio();
    homeController = Get.put(HomeController());
    //homeController = Get.find<HomeController>();
    await fetchChats();
    loading = false;
    super.onInit();
  }

  Future<void> goToChat(int id) async {
    await fetchChat(id);
    Get.toNamed('/chat');
  }

  Future<dynamic> fetchChats() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/chats',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        chats = [
          for (var chat in response.data['chats']) Chats.fromJson(chat),
        ];
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> fetchChat(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/chats/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        chat = Chat.fromJson(response.data['chat']);
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
