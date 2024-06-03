import 'package:jobera/models/portofolio_file.dart';
import 'package:jobera/models/skill.dart';

class Portofolio {
  final String title;
  final String description;
  final String link;
  final String photo;
  final List<PortoFolioFile> files;
  final List<Skill> skills;

  Portofolio({
    required this.title,
    required this.description,
    required this.link,
    required this.photo,
    required this.files,
    required this.skills,
  });

  Portofolio.fromJson(Map<String, dynamic> json)
      : title = json['title'] as String,
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
