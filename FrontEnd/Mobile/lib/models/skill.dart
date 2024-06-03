class Skill {
  final int id;
  final String name;
  final String type;

  Skill({
    required this.id,
    required this.name,
    required this.type,
  });

  Skill.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        type = json['type'] as String;

  static List<Skill> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => Skill.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
