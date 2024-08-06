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
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            ListView.builder(
              itemCount: 5,
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                BodyText(text: 'From:'),
                                LabelText(text: 'gg'),
                              ],
                            ),
                            Row(
                              children: [
                                BodyText(text: 'Message:'),
                                LabelText(text: 'gg'),
                              ],
                            ),
                            Row(
                              children: [
                                BodyText(text: 'Date:'),
                                LabelText(text: 'gg'),
                              ],
                            )
                          ],
                        ),
                        Column(
                          children: [
                            IconButton(
                              onPressed: () {},
                              icon: Icon(
                                Icons.remove_red_eye,
                                color: Colors.lightBlue.shade900,
                              ),
                            ),
                            IconButton(
                              onPressed: () {},
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
    );
  }
}
