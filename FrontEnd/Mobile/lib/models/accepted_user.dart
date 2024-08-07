class AcceptedUser {
  final int usedId;
  final String name;
  final String? type;
  final String? photo;
  final double? offer;

  AcceptedUser({
    required this.usedId,
    required this.name,
    this.type,
    this.photo,
    this.offer,
  });

  AcceptedUser.fromJson(Map<String, dynamic> json)
      : usedId = json['user_id'] as int,
        name = json['name'] as String,
        type = json['type'] != null ? json['type'] as String : null,
        photo = json['avatar_photo'] != null
            ? json['avatar_photo'] as String
            : null,
        offer = json['offer'] != null ? double.parse(json['offer']) : null;
}
