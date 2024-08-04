import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/chats_components.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/chats/chat_controller.dart';

class ChatView extends StatelessWidget {
  final ChatController _chatController = Get.find<ChatController>();
  ChatView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: _chatController.chat.name),
        leading: IconButton(
          onPressed: () => _chatController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _chatController.refreshIndicatorKey,
        onRefresh: () => _chatController.fetchChat(_chatController.chat.id),
        child: GetBuilder<ChatController>(
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
                      return MessageComponent(
                        color: Colors.orange.shade800,
                        message: controller.chat.messages[index].message,
                        date: controller.chat.messages[index].sendDate,
                      );
                    } else {
                      return MessageComponent(
                        color: Colors.lightBlue.shade900,
                        message: controller.chat.messages[index].message,
                        date: controller.chat.messages[index].sendDate,
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
