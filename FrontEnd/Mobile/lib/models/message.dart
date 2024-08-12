class Message {
  final int id;
  final int chatId;
  final String message;
  final int senderId;
  final DateTime? readAt;
  final DateTime sendDate;

  Message({
    required this.id,
    required this.chatId,
    required this.message,
    required this.senderId,
    this.readAt,
    required this.sendDate,
  });

  Message.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        chatId = json['chat_id'],
        message = json['message'] as String,
        senderId = json['sender']['user_id'] as int,
        readAt = json['Receiver']['read_at'] != null
            ? DateTime.parse(json['Receiver']['read_at'] as String)
            : null,
        sendDate = DateTime.parse(json['send_date'] as String);
}
