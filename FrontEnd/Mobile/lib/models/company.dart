import 'package:jobera/models/portfolio.dart';
import 'package:jobera/models/wallet.dart';

class Company {
  final int id;
  final String name;
  final String email;
  final String phoneNumber;
  final String country;
  final String state;
  final String field;
  final DateTime foundingDate;
  final String type;
  final String? description;
  final String? photo;
  final List<Portfolio> portfolios;
  final Wallet wallet;
  final double rating;
  final int reviewsCount;
  final int notificationsCount;

  Company({
    required this.id,
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.country,
    required this.state,
    required this.field,
    required this.foundingDate,
    required this.type,
    this.description,
    this.photo,
    required this.portfolios,
    required this.wallet,
    required this.rating,
    required this.reviewsCount,
    required this.notificationsCount,
  });

  Company.fromJson(Map<String, dynamic> json)
      : id = json['user_id'] as int,
        name = json['name'] as String,
        email = json['email'] as String,
        phoneNumber = json['phone_number'] as String,
        country = json['country'] as String,
        state = json['state'] as String,
        foundingDate = DateTime.parse(json['founding_date']),
        field = json['field'] as String,
        type = json['type'] as String,
        description = json['description'] as String?,
        photo = json['avatar_photo'] as String?,
        portfolios = [
          for (var portfolio in json['portfolios'])
            (Portfolio.fromJson(portfolio)),
        ],
        wallet = Wallet.fromJson(json['wallet']),
        rating = double.parse(json['rating']),
        reviewsCount = json['reviews'] as int,
        notificationsCount = json['notifications_count'] as int;

  Company.empty()
      : id = 0,
        name = '',
        email = '',
        phoneNumber = '',
        country = '',
        state = '',
        field = '',
        foundingDate = DateTime.now(),
        type = '',
        description = null,
        photo = null,
        portfolios = [],
        wallet = Wallet.empty(),
        rating = 0.0,
        reviewsCount = 0,
        notificationsCount = 0;
}
