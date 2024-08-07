class Notifications {
  final String id;
  final String type;
  final String notifiableType;
  final int notifiableId;
  final int chatId;
  final int senderId;
  final String senderName;
  final String message;
  final DateTime? readAt;
  final DateTime createdAt;

  Notifications({
    required this.id,
    required this.type,
    required this.notifiableType,
    required this.notifiableId,
    required this.chatId,
    required this.senderId,
    required this.senderName,
    required this.message,
    required this.readAt,
    required this.createdAt,
  });

  Notifications.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String,
        type = json['type'] as String,
        notifiableType = json['notifiable_type'] as String,
        notifiableId = json['notifiable_id'] as int,
        chatId = json['data']['chat_id'] as int,
        senderId = json['data']['sender_id'] as int,
        senderName = json['data']['sender_name'] as String,
        message = json['data']['message'] as String,
        readAt =
            json['read_at'] != null ? DateTime.parse(json['read_at']) : null,
        createdAt = DateTime.parse(json['created_at']);
}
