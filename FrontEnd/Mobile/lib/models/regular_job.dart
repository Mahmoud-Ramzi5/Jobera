import 'package:jobera/models/accepted_user.dart';
import 'package:jobera/models/competitor.dart';
import 'package:jobera/models/poster.dart';
import 'package:jobera/models/skill.dart';

class RegularJob {
  final int defJobId;
  final String title;
  final String description;
  final String? photo;
  final bool isDone;
  final double salary;
  final String type;
  final Poster poster;
  final AcceptedUser? acceptedUser;
  final List<Competitor> competitors;
  final List<Skill> requiredSkills;
  final String? state;
  final String? country;
  final DateTime publishDate;
  final bool isFlagged;

  RegularJob({
    required this.defJobId,
    required this.title,
    required this.description,
    this.photo,
    required this.isDone,
    required this.salary,
    required this.type,
    required this.poster,
    this.acceptedUser,
    required this.competitors,
    required this.requiredSkills,
    this.state,
    this.country,
    required this.publishDate,
    required this.isFlagged,
  });

  RegularJob.fromJson(Map<String, dynamic> json)
      : defJobId = json['defJob_id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        type = json['type'] as String,
        photo = json['avatar_photo'] != null ? json['photo'] as String : null,
        isDone = json['is_done'] as bool,
        salary = double.parse(json['salary']),
        poster = Poster.fromJson(json['job_user']),
        acceptedUser = json['accepted_user'] != null
            ? AcceptedUser.fromJson(json['accepted_user'])
            : null,
        competitors = [
          for (var competitor in json['competitors'])
            (Competitor.fromJson(competitor)),
        ],
        requiredSkills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ],
        state = json['location'] != null
            ? json['location']['state'] as String
            : null,
        country = json['location'] != null
            ? json['location']['country'] as String
            : null,
        publishDate = DateTime.parse(json['publish_date']),
        isFlagged = json['is_flagged'];

  RegularJob.empty()
      : defJobId = 0,
        title = '',
        description = '',
        photo = null,
        isDone = false,
        salary = 0.0,
        type = '',
        poster = Poster.empty(),
        acceptedUser = null,
        competitors = [],
        requiredSkills = [],
        state = null,
        country = null,
        publishDate = DateTime.now(),
        isFlagged = false;
}
