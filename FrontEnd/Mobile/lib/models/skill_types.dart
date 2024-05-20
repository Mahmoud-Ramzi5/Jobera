class SkillTypes {
  final int id;
  final String name;
  final Map<String, String> value;

  SkillTypes({
    required this.id,
    required this.name,
    required this.value,
  });

  SkillTypes.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        value = Map<String, String>.from(json['value'] as Map<String, dynamic>);

  SkillTypes.empty()
      : id = 0,
        name = '',
        value = {};

  static List<SkillTypes> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => SkillTypes.fromJson(json)).toList();
  }
}
