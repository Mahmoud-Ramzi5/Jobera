class Offer {
  final int competitorId;
  final int userId;
  final String userName;
  final double rating;
  final String? userPhoto;
  final String description;
  final String jobType;
  final double? offer;
  final int defJobId;
  final String jobTitle;
  final String? jobPhoto;
  final String status;

  Offer({
    required this.competitorId,
    required this.userId,
    required this.userName,
    required this.rating,
    this.userPhoto,
    required this.description,
    required this.offer,
    required this.jobType,
    required this.defJobId,
    required this.jobTitle,
    this.jobPhoto,
    required this.status,
  });

  Offer.fromJson(Map<String, dynamic> json)
      : competitorId = json['user_offer']['competitor_id'] as int,
        userId = json['user_offer']['user']['user_id'] as int,
        userName = json['user_offer']['user']['name'] as String,
        rating = double.parse(json['user_offer']['user']['rating'] as String),
        userPhoto = json['user_offer']['user']['avatar_photo'] as String?,
        description = json['user_offer']['description'] as String,
        offer = json['user_offer']['offer'] != null
            ? double.parse(json['user_offer']['offer'] as String)
            : null,
        jobType = json['user_offer']['job_type'] as String,
        defJobId = json['job_data']['defJob_id'] as int,
        jobTitle = json['job_data']['title'] as String,
        jobPhoto = json['job_data']['photo'] as String?,
        status = json['job_data']['status'] as String;
}
