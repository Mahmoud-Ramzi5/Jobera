import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/appControllers/chats/chats_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class ChatsView extends StatelessWidget {
  final ChatsController _chatsController = Get.put(ChatsController());
  ChatsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Chats'),
      ),
      body: GetBuilder<ChatsController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                child: Column(
                  children: [
                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: controller.chats.length,
                      physics: const NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.all(10),
                          child: GestureDetector(
                            onTap: () => controller.goToChat(
                              controller.chats[index].id,
                            ),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    ProfilePhotoContainer(
                                      child: controller.chats[index].photo ==
                                              null
                                          ? Icon(
                                              Icons.person,
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
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: HeadlineText(
                                              text:
                                                  controller.chats[index].name),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        0, 0, 10, 0),
                                                child: BodyText(
                                                  text: controller
                                                      .chats[index].lastMessage
                                                      .toString(),
                                                ),
                                              ),
                                              Padding(
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        10, 0, 0, 0),
                                                child: Text(
                                                  '${controller.chats[index].lastMessageDate!.day}/${controller.chats[index].lastMessageDate!.month}/${controller.chats[index].lastMessageDate!.year} ${controller.chats[index].lastMessageDate!.hour}:${controller.chats[index].lastMessageDate!.minute}',
                                                  style: TextStyle(
                                                    color: Colors.grey[500],
                                                    fontSize: 12,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                const Divider(),
                              ],
                            ),
                          ),
                        );
                      },
                    )
                  ],
                ),
              ),
      ),
    );
  }
}
