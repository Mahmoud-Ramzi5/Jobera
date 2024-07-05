import 'package:jobera/models/message.dart';

class Chat {
  final String name;
  final List<Message> messages;

  Chat({
    required this.name,
    required this.messages,
  });

  Chat.fromJson(Map<String, dynamic> json)
      : name = json['other_user']['name'],
        messages = [
          for (var message in json['messages']) (Message.fromJson(message)),
        ];
  Chat.empty()
      : name = '',
        messages = [];
}
