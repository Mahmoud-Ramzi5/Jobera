class Message {
  final int senderId;
  final String message;
  final DateTime sendDate;

  Message({
    required this.senderId,
    required this.message,
    required this.sendDate,
  });

  Message.fromJson(Map<String, dynamic> json)
      : senderId = json['user']['user_id'] as int,
        message = json['message'] as String,
        sendDate = DateTime.parse(json['send_date']);
}
