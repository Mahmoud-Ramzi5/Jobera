class User {
  final String name;
  final String email;
  final String phoneNumber;
  final String country;
  final String state;
  final String birthDate;
  final String gender;
  final String type;
  final String? description;
  final String? photo;

  User({
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.country,
    required this.state,
    required this.birthDate,
    required this.gender,
    required this.type,
    this.description,
    this.photo,
  });

  User.fromJson(Map<String, dynamic> json)
      : name = json['full_name'] as String,
        email = json['email'] as String,
        phoneNumber = json['phone_number'] as String,
        country = json['country'] as String,
        state = json['state'] as String,
        birthDate = json['birth_date'] as String,
        gender = json['gender'] as String,
        type = json['type'] as String,
        description = json['description'] as String?,
        photo = json['avatar_photo'] as String?;
}
