import 'package:jobera/models/wallet.dart';

class Poster {
  final int id;
  final int userId;
  final String name;
  final String? type;
  final String photo;
  final Wallet wallet;

  Poster({
    required this.id,
    required this.userId,
    required this.name,
    this.type,
    required this.photo,
    required this.wallet,
  });

  Poster.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        userId = json['user_id'] as int,
        name = json['name'] as String,
        type = json['type'] != null ? json['type'] as String : null,
        photo = json['avatar_photo'] as String,
        wallet = Wallet.fromJson(json['wallet']);
}
