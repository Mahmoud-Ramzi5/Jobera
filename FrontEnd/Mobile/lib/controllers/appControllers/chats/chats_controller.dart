import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/appControllers/chats/chat_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/chats.dart';

class ChatsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  List<Chats> chats = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    await fetchChats();
    loading = false;
    update();
    super.onInit();
  }

  Future<void> goToChat(int id) async {
    ChatController chatController = Get.put(ChatController());
    await chatController.fetchChat(id);
    Get.toNamed('/chat');
  }

  Future<dynamic> fetchChats() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.104:8000/api/chats',
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
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
