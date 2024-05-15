class Skills {
  final int id;
  final String name;
  final String type;

  Skills({
    required this.id,
    required this.name,
    required this.type,
  });

  Skills.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        type = json['type'] as String;
}
