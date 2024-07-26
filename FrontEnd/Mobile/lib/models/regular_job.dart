import 'package:jobera/models/accepted_user.dart';
import 'package:jobera/models/competitor.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/poster.dart';
import 'package:jobera/models/skill.dart';

class RegularJob {
  final int id;
  final int defJobId;
  final String title;
  final String description;
  final String photo;
  final bool isDone;
  final double salary;
  final String type;
  final Poster poster;
  final AcceptedUser? acceptedUser;
  final List<Competitor> competitors;
  final List<Skill> requiredSkills;
  final String state;
  final String country;
  final DateTime publishDate;
  final bool isFlagged;
  final PaginationData paginationData;

  RegularJob({
    required this.id,
    required this.defJobId,
    required this.title,
    required this.description,
    required this.photo,
    required this.isDone,
    required this.salary,
    required this.type,
    required this.poster,
    this.acceptedUser,
    required this.competitors,
    required this.requiredSkills,
    required this.state,
    required this.country,
    required this.publishDate,
    required this.isFlagged,
    required this.paginationData,
  });

  RegularJob.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        defJobId = json['defJob_id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        photo = json['photo'] as String,
        isDone = json['is_done'] as bool,
        salary = double.parse(json['salary']),
        type = json['type'] as String,
        poster = Poster.fromJson(json['company']),
        acceptedUser = null,
        competitors = [
          for (var competitor in json['competitors'])
            (Competitor.fromJson(competitor)),
        ],
        requiredSkills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ],
        state = json['location']['state'] as String,
        country = json['location']['country'] as String,
        publishDate = DateTime.parse(json['publish_date']),
        isFlagged = json['is_flagged'],
        paginationData = PaginationData.fromJson(json['pagiantion_data']);
}
