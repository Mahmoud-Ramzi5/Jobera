import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/appControllers/chats/chats_controller.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/chat.dart';

class ChatController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late HomeController homeController;
  late TextEditingController messageController;
  late ScrollController scrollController;
  Chat chat = Chat.empty();

  @override
  void onInit() {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    homeController = Get.put(HomeController());
    messageController = TextEditingController();
    scrollController = ScrollController();
    //homeController = Get.find<HomeController>();
    super.onInit();
  }

  Future<void> goBack() async {
    ChatsController chatsController = Get.find<ChatsController>();
    await chatsController.fetchChats();
    chatsController.update();
    Get.back();
  }

  Future<dynamic> fetchChat(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.43.23:8000/api/chats/$id',
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

  Future<dynamic> sendMessage(int reciverId, String message) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/chats/sendMessage',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "reciver_id": reciverId,
          "message": message,
        },
      );
      if (response.statusCode == 201) {
        messageController.clear();
        refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
