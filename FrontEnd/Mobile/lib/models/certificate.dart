class Certificate {
  final String name;
  final String organization;
  final String date;
  final String file;

  Certificate({
    required this.name,
    required this.organization,
    required this.date,
    required this.file,
  });

  Certificate.fromJson(Map<String, dynamic> json)
      : name = json['name'] as String,
        organization = json['organization'] as String,
        date = json['release_date'] as String,
        file = json['file'] as String;

  Certificate.empty()
      : name = '',
        organization = '',
        date = '',
        file = '';
}
