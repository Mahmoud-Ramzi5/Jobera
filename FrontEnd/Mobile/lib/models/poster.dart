import 'package:jobera/models/wallet.dart';

class Poster {
  final int userId;
  final String name;
  final String? type;
  final String? photo;
  final Wallet wallet;

  Poster({
    required this.userId,
    required this.name,
    required this.type,
    required this.photo,
    required this.wallet,
  });

  Poster.fromJson(Map<String, dynamic> json)
      : userId = json['user_id'] as int,
        name = json['name'] as String,
        type = json['type'] != null ? json['type'] as String : null,
        photo = json['avatar_photo'] != null
            ? json['avatar_photo'] as String
            : null,
        wallet = Wallet.fromJson(json['wallet']);
}
