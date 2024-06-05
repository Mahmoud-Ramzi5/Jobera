import 'package:jobera/models/portofolio.dart';

class Company {
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
  final List<Portofolio>? portofolios;

  Company({
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
    this.portofolios,
  });

  Company.fromJson(Map<String, dynamic> json)
      : name = json['name'] as String,
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
            (Portofolio.fromJson(portofolio)),
        ];

  Company.empty()
      : name = '',
        email = '',
        phoneNumber = '',
        country = '',
        state = '',
        field = '',
        foundingDate = '',
        type = '',
        description = null,
        photo = null,
        portofolios = [];
}
