class Education {
  final int id;
  final String level;
  final String field;
  final String school;
  final String startDate;
  final String endDate;
  final int userId;
  final String? certificateFile;

  Education({
    required this.id,
    required this.level,
    required this.field,
    required this.school,
    required this.startDate,
    required this.endDate,
    required this.userId,
    required this.certificateFile,
  });

  Education.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        level = json['level'] as String,
        field = json['field'] as String,
        school = json['school'] as String,
        startDate = json['start_date'] as String,
        endDate = json['end_date'] as String,
        userId = json['user_id'] as int,
        certificateFile = json['certificate_file'] as String?;

  Education.empty()
      : id = 0,
        level = '',
        field = '',
        school = '',
        startDate = '',
        endDate = '',
        userId = 0,
        certificateFile = null;
}
