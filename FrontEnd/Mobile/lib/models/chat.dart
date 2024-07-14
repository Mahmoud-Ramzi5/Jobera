import 'package:jobera/models/message.dart';

class Chat {
  final int id;
  final String name;
  final List<Message> messages;
  final int senderId;
  final int reciverId;

  Chat({
    required this.id,
    required this.name,
    required this.messages,
    required this.senderId,
    required this.reciverId,
  });

  Chat.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['other_user']['name'],
        messages = [
          for (var message in json['messages']) Message.fromJson(message),
        ].reversed.toList(),
        senderId = json['sender']['user_id'],
        reciverId = json['other_user']['user_id'];
  Chat.empty()
      : id = 0,
        name = '',
        messages = [],
        senderId = 0,
        reciverId = 0;
}
