import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/chats_components.dart';
import 'package:jobera/controllers/appControllers/chats/chats_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class ChatView extends StatelessWidget {
  final ChatsController _chatController = Get.put(ChatsController());
  ChatView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: _chatController.chat.name),
        leading: IconButton(
          onPressed: () async =>
              _chatController.goBack(_chatController.chat.id),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _chatController.refreshIndicatorKey2,
        onRefresh: () => _chatController.fetchChat(_chatController.chat.id),
        child: GetBuilder<ChatsController>(
          builder: (controller) => Column(
            children: [
              Expanded(
                child: ListView.builder(
                  reverse: true,
                  shrinkWrap: true,
                  itemCount: controller.chat.messages.length,
                  itemBuilder: (context, index) {
                    if (controller.chat.messages[index].senderId ==
                        controller.homeController.id) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          MessageComponent(
                            color: Colors.orange.shade800,
                            message: controller.chat.messages[index].message,
                            date: controller.chat.messages[index].sendDate,
                          ),
                        ],
                      );
                    } else {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          MessageComponent(
                            color: Colors.lightBlue.shade900,
                            message: controller.chat.messages[index].message,
                            date: controller.chat.messages[index].sendDate,
                          ),
                        ],
                      );
                    }
                  },
                ),
              ),
              SendMessageComponenet(
                messageController: controller.messageController,
                onPressed: () => controller.sendMessage(
                  controller.chat.reciverId,
                  controller.messageController.text,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
