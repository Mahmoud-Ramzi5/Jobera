class AcceptedUser {
  final int usedId;
  final String name;
  final String? type;
  final String? photo;
  final double? offer;

  AcceptedUser({
    required this.usedId,
    required this.name,
    required this.type,
    required this.photo,
    required this.offer,
  });

  AcceptedUser.fromJson(Map<String, dynamic> json)
      : usedId = json['user_id'] as int,
        name = json['name'] as String,
        type = json['type'] != null ? json['type'] as String : null,
        photo = json['avatar_photo'] != null
            ? json['avatar_photo'] as String
            : null,
        offer = json['salary'] != null ? double.parse(json['salary']) : null;
}
