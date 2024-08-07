import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/notifications_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class NotificationsView extends StatelessWidget {
  final NotificationsController _notificationsController =
      Get.put(NotificationsController());

  NotificationsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Notifications'),
        leading: IconButton(
          onPressed: () => _notificationsController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _notificationsController.refreshIndicatorKey,
        onRefresh: () => _notificationsController.fetchNotifications(),
        child: GetBuilder<NotificationsController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          TextButton(
                            onPressed: () {},
                            child: Row(
                              children: [
                                const BodyText(text: 'Mark all as read '),
                                Icon(
                                  Icons.remove_red_eye,
                                  color: Colors.lightBlue.shade900,
                                ),
                              ],
                            ),
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Row(
                              children: [
                                BodyText(text: 'Delete all '),
                                Icon(
                                  Icons.delete,
                                  color: Colors.red,
                                ),
                              ],
                            ),
                          )
                        ],
                      ),
                      ListView.builder(
                        itemCount: controller.notifications.length,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: const BorderRadius.all(
                                Radius.circular(10),
                              ),
                              side: BorderSide(
                                color: Colors.orange.shade800,
                                width: 2,
                              ),
                            ),
                            margin: const EdgeInsets.all(10),
                            child: Padding(
                              padding: const EdgeInsets.all(10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          const BodyText(text: 'From: '),
                                          LabelText(
                                            text: controller
                                                .notifications[index]
                                                .senderName,
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          const BodyText(text: 'Message: '),
                                          LabelText(
                                            text: controller
                                                .notifications[index].message,
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          const BodyText(text: 'Date: '),
                                          LabelText(
                                            text:
                                                '${controller.notifications[index].createdAt.day}/${controller.notifications[index].createdAt.month}/${controller.notifications[index].createdAt.year} ${controller.notifications[index].createdAt.hour}:${controller.notifications[index].createdAt.minute}',
                                          ),
                                        ],
                                      )
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      if (controller
                                              .notifications[index].readAt ==
                                          null)
                                        IconButton(
                                          onPressed: () =>
                                              controller.markNotification(
                                            controller.notifications[index].id,
                                          ),
                                          icon: Icon(
                                            Icons.remove_red_eye,
                                            color: Colors.lightBlue.shade900,
                                          ),
                                        )
                                      else
                                        const BodyText(text: 'Read'),
                                      IconButton(
                                        onPressed: () =>
                                            controller.deleteNotification(
                                          controller.notifications[index].id,
                                        ),
                                        icon: const Icon(
                                          Icons.delete,
                                          color: Colors.red,
                                        ),
                                      ),
                                    ],
                                  ),
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
      ),
    );
  }
}
