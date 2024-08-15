import 'package:jobera/models/certificate.dart';
import 'package:jobera/models/education.dart';
import 'package:jobera/models/portfolio.dart';
import 'package:jobera/models/skill.dart';
import 'package:jobera/models/wallet.dart';

class User {
  final int id;
  final String name;
  final String email;
  final String phoneNumber;
  final String country;
  final String state;
  final DateTime birthDate;
  final String gender;
  final String type;
  final String? description;
  final String? photo;
  final Education? education;
  final List<Skill> skills;
  final List<Certificate> certificates;
  final List<Portfolio> portfolios;
  final String step;
  final Wallet wallet;
  final double rating;
  final int reviewsCount;
  final int notificationsCount;

  User({
    required this.id,
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
    this.education,
    required this.skills,
    required this.portfolios,
    required this.certificates,
    required this.step,
    required this.wallet,
    required this.rating,
    required this.reviewsCount,
    required this.notificationsCount,
  });

  User.fromJson(Map<String, dynamic> json)
      : id = json['user_id'] as int,
        name = json['full_name'] as String,
        email = json['email'] as String,
        phoneNumber = json['phone_number'] as String,
        country = json['country'] as String,
        state = json['state'] as String,
        birthDate = DateTime.parse(json['birth_date']),
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
        portfolios = [
          for (var portfolio in json['portfolios'])
            (Portfolio.fromJson(portfolio)),
        ],
        step = json['register_step'],
        wallet = Wallet.fromJson(json['wallet']),
        rating = double.parse(json['rating']),
        reviewsCount = json['reviews'] as int,
        notificationsCount = json['notifications_count'] as int;

  User.empty()
      : id = 0,
        name = '',
        email = '',
        phoneNumber = '',
        country = '',
        state = '',
        birthDate = DateTime.now(),
        gender = '',
        type = '',
        description = null,
        photo = null,
        education = Education.empty(),
        skills = [],
        certificates = [],
        portfolios = [],
        step = '',
        wallet = Wallet.empty(),
        rating = 0.0,
        reviewsCount = 0,
        notificationsCount = 0;
}
