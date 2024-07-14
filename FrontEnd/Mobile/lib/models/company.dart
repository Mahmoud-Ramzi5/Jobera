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
  final String foundingDate;
  final String type;
  final String? description;
  final String? photo;
  final List<Portfolio> portofolios;
  final Wallet wallet;

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
    required this.portofolios,
    required this.wallet,
    this.description,
    this.photo,
  });

  Company.fromJson(Map<String, dynamic> json)
      : id = json['company_id'] as int,
        name = json['name'] as String,
        email = json['email'] as String,
        phoneNumber = json['phone_number'] as String,
        country = json['country'] as String,
        state = json['state'] as String,
        foundingDate = json['founding_date'] as String,
        field = json['field'] as String,
        type = json['type'] as String,
        description = json['description'] as String?,
        photo = json['avatar_photo'] as String?,
        portofolios = [
          for (var portofolio in json['portfolios'])
            (Portfolio.fromJson(portofolio)),
        ],
        wallet = Wallet.fromJson(json['wallet']);

  Company.empty()
      : id = 0,
        name = '',
        email = '',
        phoneNumber = '',
        country = '',
        state = '',
        field = '',
        foundingDate = '',
        type = '',
        description = null,
        photo = null,
        portofolios = [],
        wallet = Wallet.empty();
}
