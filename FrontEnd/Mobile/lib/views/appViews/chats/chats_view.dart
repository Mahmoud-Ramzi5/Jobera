import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/chats_components.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/chats/chats_controller.dart';

class ChatsView extends StatelessWidget {
  final ChatsController _chatsController = Get.put(ChatsController());

  ChatsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(
        key: _chatsController.refreshIndicatorKey,
        onRefresh: () => _chatsController.fetchChats(),
        child: SizedBox(
          height: Get.height,
          child: GetBuilder<ChatsController>(
            builder: (controller) => controller.loading
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                : controller.chats.isEmpty
                    ? SingleChildScrollView(
                        child: SizedBox(
                          height: Get.height,
                          child: Center(
                            child: MediumHeadlineText(text: '130'.tr),
                          ),
                        ),
                      )
                    : ListView.builder(
                        itemCount: controller.chats.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () =>
                                controller.goToChat(controller.chats[index].id),
                            child: ChatsComponent(
                              photo: controller.chats[index].photo,
                              name: controller.chats[index].name,
                              lastMessage: controller.chats[index].lastMessage,
                              lastMessageDate:
                                  controller.chats[index].lastMessageDate,
                              unreadMessagesCount:
                                  controller.chats[index].unreadMessages,
                            ),
                          );
                        },
                      ),
          ),
        ),
      ),
    );
  }
}
