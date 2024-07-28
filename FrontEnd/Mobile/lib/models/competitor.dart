class Competitor {
  final int competitorId;
  final int userId;
  final String name;
  final String? type;
  final double? rating;
  final String? photo;
  final String description;
  final String jobType;
  final double? offer;

  Competitor({
    required this.competitorId,
    required this.userId,
    required this.name,
    required this.description,
    required this.jobType,
    this.type,
    this.rating,
    this.photo,
    this.offer,
  });

  Competitor.fromJson(Map<String, dynamic> json)
      : competitorId = json['competitor_id'] as int,
        userId = json['user']['user_id'] as int,
        name = json['user']['name'] as String,
        type = json['user']['type'] != null
            ? json['user']['type'] as String
            : null,
        photo = json['user']['avatar_photo'] != null
            ? json['user']['avatar_photo'] as String
            : null,
        rating = json['user']['rating'] != null
            ? double.parse(json['user']['rating'])
            : null,
        description = json['description'] as String,
        offer = json['offer'] != null ? double.parse(json['offer']) : null,
        jobType = json['job_type'] as String;
}
