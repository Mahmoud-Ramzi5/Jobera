class Certificate {
  final int id;
  final String name;
  final String organization;
  final String date;
  final String file;

  Certificate({
    required this.id,
    required this.name,
    required this.organization,
    required this.date,
    required this.file,
  });

  Certificate.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        organization = json['organization'] as String,
        date = json['release_date'] as String,
        file = json['file'] as String;
}
