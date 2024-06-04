import 'package:jobera/models/portofolio_file.dart';
import 'package:jobera/models/skill.dart';

class Portofolio {
  final int id;
  final String title;
  final String description;
  final String link;
  final String? photo;
  final List<PortoFolioFile>? files;
  final List<Skill> skills;

  Portofolio({
    required this.id,
    required this.title,
    required this.description,
    required this.link,
    required this.skills,
    this.photo,
    this.files,
  });

  Portofolio.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        link = json['link'] as String,
        photo = json['photo'] as String,
        files = [
          for (var portofolioFile in json['files'])
            (PortoFolioFile.fromJson(portofolioFile)),
        ],
        skills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ];
}
