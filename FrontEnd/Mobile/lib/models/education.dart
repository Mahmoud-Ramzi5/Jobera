class Education {
  final String level;
  final String field;
  final String school;
  final DateTime startDate;
  final DateTime endDate;
  final String? certificateFile;

  Education({
    required this.level,
    required this.field,
    required this.school,
    required this.startDate,
    required this.endDate,
    this.certificateFile,
  });

  Education.fromJson(Map<String, dynamic> json)
      : level = json['level'] as String,
        field = json['field'] as String,
        school = json['school'] as String,
        startDate = DateTime.parse(json['start_date']),
        endDate = DateTime.parse(json['end_date']),
        certificateFile = json['certificate_file'] as String?;

  Education.empty()
      : level = '',
        field = '',
        school = '',
        startDate = DateTime.now(),
        endDate = DateTime.now(),
        certificateFile = '';
}
