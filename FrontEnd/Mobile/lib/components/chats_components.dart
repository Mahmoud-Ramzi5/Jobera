import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/texts.dart';

class ChatsComponent extends StatelessWidget {
  final String? photo;
  final String name;
  final String? lastMessage;
  final DateTime? lastMessageDate;

  const ChatsComponent({
    super.key,
    this.photo,
    required this.name,
    this.lastMessage,
    this.lastMessageDate,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          Row(
            children: [
              ProfilePhotoContainer(
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
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SmallHeadlineText(text: name),
                    BodyText(
                      text: lastMessage == null ? '' : lastMessage.toString(),
                    ),
                    Text(
                      lastMessageDate == null
                          ? ''
                          : ' ${lastMessageDate?.day}/${lastMessageDate?.month}/${lastMessageDate?.year} ${lastMessageDate?.hour}:${lastMessageDate?.minute}',
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
    );
  }
}
