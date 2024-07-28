class Chats {
  final int id;
  final String name;
  final String? photo;
  final String? lastMessage;
  final DateTime? lastMessageDate;

  Chats({
    required this.id,
    required this.name,
    this.photo,
    this.lastMessage,
    this.lastMessageDate,
  });

  Chats.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['other_user']['name'] as String,
        photo = json['other_user']['avatar_photo'] as String?,
        lastMessage = json['last_message'] != null
            ? json['last_message']['message'] as String?
            : null,
        lastMessageDate = json['last_message'] != null
            ? DateTime.parse(json['last_message']['send_date'])
            : null;
}
