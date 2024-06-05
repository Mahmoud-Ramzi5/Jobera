class Education {
  final String level;
  final String field;
  final String school;
  final String startDate;
  final String endDate;
  final String? certificateFile;

  Education({
    required this.level,
    required this.field,
    required this.school,
    required this.startDate,
    required this.endDate,
    required this.certificateFile,
  });

  Education.fromJson(Map<String, dynamic> json)
      : level = json['level'] as String,
        field = json['field'] as String,
        school = json['school'] as String,
        startDate = json['start_date'] as String,
        endDate = json['end_date'] as String,
        certificateFile = json['certificate_file'] as String?;

  Education.empty()
      : level = '',
        field = '',
        school = '',
        startDate = '',
        endDate = '',
        certificateFile = '';
}
