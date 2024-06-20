import 'package:jobera/models/certificate.dart';
import 'package:jobera/models/education.dart';
import 'package:jobera/models/portfolio.dart';
import 'package:jobera/models/skill.dart';
import 'package:jobera/models/wallet.dart';

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
  final Education? education;
  final List<Skill> skills;
  final List<Certificate> certificates;
  final List<Portfolio> portofolios;
  final String step;
  final Wallet wallet;

  User({
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.country,
    required this.state,
    required this.birthDate,
    required this.gender,
    required this.type,
    required this.skills,
    required this.portofolios,
    required this.certificates,
    required this.step,
    required this.wallet,
    this.education,
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
        photo = json['avatar_photo'] as String?,
        education = json['education'] != null
            ? Education.fromJson(json['education'])
            : null,
        skills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ],
        certificates = [
          for (var certificate in json['certificates'])
            (Certificate.fromJson(certificate)),
        ],
        portofolios = [
          for (var portofolio in json['portfolios'])
            (Portfolio.fromJson(portofolio)),
        ],
        step = json['register_step'],
        wallet = Wallet.fromJson(json['wallet']);

  User.empty()
      : name = '',
        email = '',
        phoneNumber = '',
        country = '',
        state = '',
        birthDate = '',
        gender = '',
        type = '',
        description = null,
        photo = null,
        education = Education.empty(),
        skills = [],
        certificates = [],
        portofolios = [],
        step = '',
        wallet = Wallet.empty();
}
