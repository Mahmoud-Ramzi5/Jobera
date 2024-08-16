import 'dart:developer';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/chat.dart';
import 'package:jobera/models/chats.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';

class ChatsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey2;
  late HomeController homeController;
  late PusherChannelsFlutter pusher;
  late Dio dio;
  late TextEditingController messageController;
  late ScrollController scrollController;
  List<Chats> chats = [];
  bool loading = true;
  int chatId = 0;
  Chat chat = Chat.empty();
  bool inChat = false;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    refreshIndicatorKey2 = GlobalKey<RefreshIndicatorState>();
    homeController = Get.find<HomeController>();
    pusher = PusherChannelsFlutter();
    dio = Dio();
    messageController = TextEditingController();
    scrollController = ScrollController();
    Future.delayed(const Duration(milliseconds: 100));
    await fetchChats();
    await initPusher(homeController.id);
    for (var chat in chats) {
      initChannels(chat.id);
    }
    loading = false;
    update();
    super.onInit();
  }

  @override
  void onClose() {
    messageController.dispose();
    pusher.disconnect();
    super.onClose();
  }

  Future<void> goToChat(int id) async {
    inChat = true;
    chatId = id;
    await fetchChat(id);
    Get.toNamed('/chat');
  }

  goBack(int id) {
    inChat = false;
    markAsRead(id);
    refreshIndicatorKey.currentState!.show();
    update();
    Get.back();
  }

  Future<void> initPusher(int id) async {
    try {
      await pusher.init(
        logToConsole: true,
        apiKey: '181e3fe8a6a1e1e21e6e',
        cluster: "ap2",
        onConnectionStateChange: onConnectionStateChange,
        onError: onError,
        onSubscriptionSucceeded: onSubscriptionSucceeded,
        onEvent: onEvent,
        onSubscriptionError: onSubscriptionError,
        onDecryptionFailure: onDecryptionFailure,
        onMemberAdded: onMemberAdded,
        onMemberRemoved: onMemberRemoved,
        onAuthorizer: onAuthorizer,
      );
      await pusher.subscribe(channelName: 'private-user.$id');
      await pusher.connect();
    } catch (e) {
      log("error in initialization: $e");
    }
  }

  getSignature(String value) {
    var key = utf8.encode('0b3db4b631c6307250a5');
    var bytes = utf8.encode(value);
    var hmacSha256 = Hmac(sha256, key); // HMAC-SHA256
    var digest = hmacSha256.convert(bytes);
    log("HMAC signature in string is: $digest");
    return digest;
  }

  dynamic onAuthorizer(String channelName, String socketId, dynamic options) {
    return {
      "auth": "181e3fe8a6a1e1e21e6e:${getSignature("$socketId:$channelName")}",
    };
  }

  void onError(String message, int? code, dynamic e) {
    log("onError: $message code: $code exception: $e");
  }

  void onConnectionStateChange(dynamic currentState, dynamic previousState) {
    log("Connection: $currentState");
  }

  void onMemberRemoved(String channelName, PusherMember member) {
    log("onMemberRemoved: $channelName member: $member");
  }

  void onMemberAdded(String channelName, PusherMember member) {
    log("onMemberAdded: $channelName member: $member");
  }

  void onSubscriptionSucceeded(String channelName, dynamic data) {
    log("onSubscriptionSucceeded: $channelName data: $data");
  }

  void onSubscriptionError(String message, dynamic e) {
    log("onSubscriptionError: $message Exception: $e");
  }

  Future<void> onEvent(PusherEvent event) async {
    if (event.eventName == 'NewMessage') {
      fetchChats();
      if (inChat) {
        fetchChat(chatId);
      }
    }
    if (event.eventName == 'NewNotification') {
      var eventData = jsonDecode(event.data);
      FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
          FlutterLocalNotificationsPlugin();
      await flutterLocalNotificationsPlugin.initialize(
        const InitializationSettings(
          android: AndroidInitializationSettings(
            '@mipmap/launcher_icon',
          ),
        ),
      );
      await flutterLocalNotificationsPlugin.show(
        0,
        eventData['notification']['data']['sender_name'],
        eventData['notification']['data']['message'],
        NotificationDetails(
          android: AndroidNotificationDetails(
            eventData['notification']['id'],
            event.channelName,
            icon: '@mipmap/launcher_icon',
          ),
        ),
      );
    }
    log("onEvent: $event");
  }

  void onDecryptionFailure(String event, String reason) {
    log("onDecryptionFailure: $event reason: $reason");
  }

  Future<void> initChannels(int id) async {
    await pusher.subscribe(
      channelName: 'private-chat.$id',
    );
  }

  Future<dynamic> fetchChats() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/chats',
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
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> fetchChat(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/chats/$id',
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
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> sendMessage(int reciverId, String message) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/chats/sendMessage',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "receiver_id": reciverId,
          "message": message,
        },
      );
      if (response.statusCode == 201) {
        messageController.clear();
        refreshIndicatorKey2.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }

  Future<dynamic> markAsRead(int chatId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/chat/messages',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "chat_id": chatId,
        },
      );
      if (response.statusCode == 200) {}
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response.toString(),
      );
    }
  }
}
