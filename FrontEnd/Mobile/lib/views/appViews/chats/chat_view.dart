import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/chats/chat_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

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
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          MessageContainer(
                            color: Colors.orange.shade800,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Flexible(
                                  child: BodyText(
                                    text:
                                        controller.chat.messages[index].message,
                                  ),
                                ),
                                Flexible(
                                  child: Text(
                                    '${controller.chat.messages[index].sendDate.day}/${controller.chat.messages[index].sendDate.month}/${controller.chat.messages[index].sendDate.year} ${controller.chat.messages[index].sendDate.hour}:${controller.chat.messages[index].sendDate.minute}',
                                    style: TextStyle(
                                      color: Colors.grey[500],
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          )
                        ],
                      );
                    } else {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          MessageContainer(
                            color: Colors.lightBlue.shade900,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Flexible(
                                  child: BodyText(
                                    text:
                                        controller.chat.messages[index].message,
                                  ),
                                ),
                                Flexible(
                                  child: Text(
                                    '${controller.chat.messages[index].sendDate.day}/${controller.chat.messages[index].sendDate.month}/${controller.chat.messages[index].sendDate.year} ${controller.chat.messages[index].sendDate.hour}:${controller.chat.messages[index].sendDate.minute}',
                                    style: TextStyle(
                                      color: Colors.grey[500],
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          )
                        ],
                      );
                    }
                  },
                ),
              ),
              SendMessageContainer(
                child: Row(
                  children: [
                    Expanded(
                      flex: 1,
                      child: CustomTextField(
                        controller: controller.messageController,
                        textInputType: TextInputType.text,
                        obsecureText: false,
                        hintText: 'Type a message...',
                        icon: const Icon(Icons.chat_bubble),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: ElevatedButton(
                        onPressed: () => controller.sendMessage(
                          controller.chat.reciverId,
                          controller.messageController.text,
                        ),
                        child: const Text('Send'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
