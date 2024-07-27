import 'package:jobera/models/accepted_user.dart';
import 'package:jobera/models/competitor.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/poster.dart';
import 'package:jobera/models/skill.dart';

class FreelancingJob {
  final int id;
  final int defJobId;
  final String title;
  final String description;
  final String type;
  final String photo;
  final bool isDone;
  final double minSalary;
  final double maxSalary;
  final DateTime deadline;
  final double avgSalary;
  final Poster poster;
  final AcceptedUser? acceptedUser;
  final List<Competitor> competitors;
  final List<Skill> requiredSkills;
  final String? state;
  final String? country;
  final DateTime publishDate;
  final bool isFlagged;
  final PaginationData paginationData;

  FreelancingJob({
    required this.id,
    required this.defJobId,
    required this.title,
    required this.description,
    required this.type,
    required this.photo,
    required this.isDone,
    required this.minSalary,
    required this.maxSalary,
    required this.deadline,
    required this.avgSalary,
    required this.poster,
    required this.acceptedUser,
    required this.competitors,
    required this.requiredSkills,
    this.state,
    this.country,
    required this.publishDate,
    required this.isFlagged,
    required this.paginationData,
  });

  FreelancingJob.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        defJobId = json['defJob_id'] as int,
        title = json['title'] as String,
        description = json['description'] as String,
        type = json['type'] as String,
        photo = json['photo'] as String,
        isDone = json['is_done'] as bool,
        minSalary = double.parse(json['min_salary']),
        maxSalary = double.parse(json['max_salary']),
        deadline = DateTime.parse(json['deadline']),
        avgSalary = json['avg_salary'],
        poster = Poster.fromJson(json['company']),
        acceptedUser = null,
        competitors = [
          for (var competitor in json['competitors'])
            (Competitor.fromJson(competitor)),
        ],
        requiredSkills = [
          for (var skill in json['skills']) (Skill.fromJson(skill)),
        ],
        state = json['location']['state'] != null
            ? json['location']['state'] as String
            : null,
        country = json['location']['country'] != null
            ? json['location']['country'] as String
            : null,
        publishDate = DateTime.parse(json['publish_date']),
        isFlagged = json['is_flagged'],
        paginationData = PaginationData.fromJson(json['pagiantion_data']);
}
