class Competitor {
  final int competitorId;
  final int id;
  final int userId;
  final String name;
  final String type;
  final double rating;
  final String photo;
  final String description;
  final double offer;
  final String jobType;

  Competitor({
    required this.competitorId,
    required this.id,
    required this.userId,
    required this.name,
    required this.type,
    required this.rating,
    required this.photo,
    required this.description,
    required this.offer,
    required this.jobType,
  });

  Competitor.fromJson(Map<String, dynamic> json)
      : competitorId = json['id'] as int,
        id = json['user']['id'] as int,
        userId = json['user']['user_id'] as int,
        name = json['user']['name'] as String,
        type = json['user']['type'] as String,
        photo = json['user']['avatar_photo'] as String,
        rating = double.parse(json['user']['rating']),
        description = json['description'] as String,
        offer = double.parse(json['salary']),
        jobType = json['job_type'] as String;
}
