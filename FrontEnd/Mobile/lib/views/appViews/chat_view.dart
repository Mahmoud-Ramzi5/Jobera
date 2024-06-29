import 'package:flutter/material.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class ChatView extends StatelessWidget {
  const ChatView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Name'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: 15,
              reverse: true,
              itemBuilder: (context, index) {
                if (index < 10) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      MessageContainer(
                        color: Colors.orange.shade800,
                        child: BodyText(
                          text: 'Message $index',
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
                        child: BodyText(
                          text: 'Message $index',
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
                    controller: TextEditingController(),
                    textInputType: TextInputType.text,
                    obsecureText: false,
                    hintText: 'Type a message...',
                    icon: const Icon(Icons.message),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: ElevatedButton(
                    onPressed: () {},
                    child: const Text('Send'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
