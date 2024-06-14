import 'package:jobera/models/portfolio_file.dart';
import 'package:jobera/models/skill.dart';

class Portfolio {
  final int id;
  final String title;
  final String description;
  final String link;
  final String? photo;
  final List<PortfolioFile> files;
  final List<Skill> skills;

  Portfolio({
    required this.id,
    required this.title,
    required this.description,
    required this.link,
    required this.skills,
    required this.files,
    this.photo,
  });

  Portfolio.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        link = json['link'] as String,
        photo = json['photo'] as String?,
        files = [
          for (var portofolioFile in json['files'])
            (PortfolioFile.fromJson(portofolioFile)),
        ],
        skills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ];

  Portfolio.empty()
      : id = 0,
        title = '',
        description = '',
        link = '',
        photo = '',
        files = [],
        skills = [];
}
