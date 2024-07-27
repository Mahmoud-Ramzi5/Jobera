import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/chats/chats_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class ChatsView extends StatelessWidget {
  final ChatsController _chatsController = Get.put(ChatsController());

  ChatsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(
        key: _chatsController.refreshIndicatorKey,
        onRefresh: () => _chatsController.fetchChats(),
        child: GetBuilder<ChatsController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : controller.chats.isEmpty
                  ? const Center(
                      child: MediumHeadlineText(text: 'No Chats'),
                    )
                  : ListView.builder(
                      itemCount: controller.chats.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () =>
                              controller.goToChat(controller.chats[index].id),
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    ProfilePhotoContainer(
                                      child: controller.chats[index].photo ==
                                              null
                                          ? Icon(
                                              Icons.messenger_outline,
                                              size: 100,
                                              color: Colors.lightBlue.shade900,
                                            )
                                          : CustomImage(
                                              width: 100,
                                              height: 100,
                                              path: controller
                                                  .chats[index].photo
                                                  .toString(),
                                            ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          SmallHeadlineText(
                                              text:
                                                  controller.chats[index].name),
                                          BodyText(
                                            text: controller.chats[index]
                                                        .lastMessage ==
                                                    null
                                                ? ''
                                                : controller
                                                    .chats[index].lastMessage
                                                    .toString(),
                                          ),
                                          Text(
                                            controller.chats[index]
                                                        .lastMessageDate ==
                                                    null
                                                ? ''
                                                : '${controller.chats[index].lastMessageDate?.day}/${controller.chats[index].lastMessageDate?.month}/${controller.chats[index].lastMessageDate?.year} ${controller.chats[index].lastMessageDate?.hour}:${controller.chats[index].lastMessageDate?.minute}',
                                            style: const TextStyle(
                                              color: Colors.grey,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                                const Divider(),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
        ),
      ),
    );
  }
}
