import 'package:jobera/models/certificate.dart';
import 'package:jobera/models/education.dart';
import 'package:jobera/models/skills.dart';

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
  final Education education;
  final List<Skills> skills;
  final List<Certificate>? certificates;

  User(
      {required this.name,
      required this.email,
      required this.phoneNumber,
      required this.country,
      required this.state,
      required this.birthDate,
      required this.gender,
      required this.type,
      this.description,
      this.photo,
      required this.education,
      required this.skills,
      this.certificates});

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
        education = Education.fromJson(json['education']),
        skills = [
          for (var skill in json['skills']) (Skills.fromJson(skill)),
        ],
        certificates = [
          for (var certificate in json['certificates'])
            (Certificate.fromJson(certificate)),
        ];

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
        certificates = [];
}
