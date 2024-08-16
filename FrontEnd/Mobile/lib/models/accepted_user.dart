class AcceptedUser {
  final int userId;
  final String name;
  final String? type;
  final String? photo;
  final double? offer;

  AcceptedUser({
    required this.userId,
    required this.name,
    this.type,
    this.photo,
    this.offer,
  });

  AcceptedUser.fromJson(Map<String, dynamic> json)
      : userId = json['user_id'] as int,
        name = json['name'] as String,
        type = json['type'] != null ? json['type'] as String : null,
        photo = json['avatar_photo'] != null
            ? json['avatar_photo'] as String
            : null,
        offer = json['offer'] != null ? double.parse(json['offer']) : null;
}
