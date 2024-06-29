import 'package:flutter/material.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class ChatsView extends StatelessWidget {
  const ChatsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Chats'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            ListView.builder(
              shrinkWrap: true,
              itemCount: 20,
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) {
                return GestureDetector(
                  child: const Padding(
                    padding: EdgeInsets.all(10),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            ProfilePhotoContainer(
                              height: 100,
                              width: 100,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsets.all(10),
                                  child: HeadlineText(text: 'Name'),
                                ),
                                Padding(
                                  padding: EdgeInsets.all(10),
                                  child: BodyText(text: 'last Message'),
                                )
                              ],
                            )
                          ],
                        ),
                        Divider(),
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
