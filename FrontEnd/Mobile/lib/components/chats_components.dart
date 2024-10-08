import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/texts.dart';

class ChatsComponent extends StatelessWidget {
  final String? photo;
  final String name;
  final String? lastMessage;
  final DateTime? lastMessageDate;
  final int unreadMessagesCount;

  const ChatsComponent({
    super.key,
    this.photo,
    required this.name,
    this.lastMessage,
    this.lastMessageDate,
    required this.unreadMessagesCount,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: ProfilePhotoContainer(
                child: photo == null
                    ? Icon(
                        Icons.messenger_outline,
                        size: 100,
                        color: Colors.lightBlue.shade900,
                      )
                    : CustomImage(
                        width: 100,
                        height: 100,
                        path: photo.toString(),
                      ),
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: SmallHeadlineText(text: name),
                      ),
                      if (unreadMessagesCount > 0)
                        Container(
                          decoration: const ShapeDecoration(
                            shape: CircleBorder(
                              side: BorderSide(color: Colors.red),
                            ),
                          ),
                          child: Center(
                            child: Padding(
                              padding: const EdgeInsets.all(5),
                              child: Text(
                                unreadMessagesCount > 10
                                    ? '+10'
                                    : '$unreadMessagesCount',
                                style: TextStyle(
                                  color: Colors.lightBlue.shade900,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                  BodyText(
                    text: lastMessage ?? '',
                    textOverflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    lastMessageDate == null
                        ? ''
                        : '${lastMessageDate!.day}/${lastMessageDate!.month}/${lastMessageDate!.year} ${lastMessageDate!.hour}:${lastMessageDate!.minute}',
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
    );
  }
}

class MessageComponent extends StatelessWidget {
  final Color color;
  final String message;
  final DateTime date;

  const MessageComponent({
    super.key,
    required this.color,
    required this.message,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        MessageContainer(
          color: color,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              BodyText(
                text: message,
              ),
              Text(
                '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute}',
                style: TextStyle(
                  color: Colors.grey[500],
                  fontSize: 12,
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}

class SendMessageComponenet extends StatelessWidget {
  final TextEditingController messageController;
  final void Function()? onPressed;

  const SendMessageComponenet({
    super.key,
    required this.messageController,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SendMessageContainer(
      child: Row(
        children: [
          Expanded(
            flex: 1,
            child: CustomTextField(
              controller: messageController,
              textInputType: TextInputType.text,
              obsecureText: false,
              hintText: '167'.tr,
              icon: Icons.chat_bubble,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: ElevatedButton(
              onPressed: onPressed,
              child: Text('168'.tr),
            ),
          ),
        ],
      ),
    );
  }
}
