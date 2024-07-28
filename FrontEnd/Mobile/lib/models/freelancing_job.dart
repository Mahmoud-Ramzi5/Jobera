import 'package:jobera/models/accepted_user.dart';
import 'package:jobera/models/competitor.dart';
import 'package:jobera/models/poster.dart';
import 'package:jobera/models/skill.dart';

class FreelancingJob {
  final int defJobId;
  final String title;
  final String description;
  final String type;
  final String? photo;
  final bool isDone;
  final double minOffer;
  final double maxOffer;
  final DateTime deadline;
  final double? avgOffer;
  final Poster poster;
  final AcceptedUser? acceptedUser;
  final List<Competitor> competitors;
  final List<Skill> requiredSkills;
  final String? state;
  final String? country;
  final DateTime publishDate;
  final bool isFlagged;

  FreelancingJob({
    required this.defJobId,
    required this.title,
    required this.description,
    required this.type,
    required this.photo,
    required this.isDone,
    required this.minOffer,
    required this.maxOffer,
    required this.deadline,
    required this.avgOffer,
    required this.poster,
    required this.acceptedUser,
    required this.competitors,
    required this.requiredSkills,
    required this.state,
    required this.country,
    required this.publishDate,
    required this.isFlagged,
  });

  FreelancingJob.fromJson(Map<String, dynamic> json)
      : defJobId = json['defJob_id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        type = json['type'] as String,
        photo = json['photo'] != null ? json['photo'] as String : null,
        isDone = json['is_done'] as bool,
        minOffer = double.parse(json['min_salary']),
        maxOffer = double.parse(json['max_salary']),
        deadline = DateTime.parse(json['deadline']),
        avgOffer = json['avg_salary'] != null
            ? double.parse(json['avg_salary'])
            : null,
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
}
