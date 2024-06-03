class SkillType {
  final int id;
  final String name;
  final Map<String, String> value;

  SkillType({
    required this.id,
    required this.name,
    required this.value,
  });

  SkillType.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        value = Map<String, String>.from(json['value'] as Map<String, dynamic>);

  SkillType.empty()
      : id = 0,
        name = '',
        value = {};

  static List<SkillType> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => SkillType.fromJson(json)).toList();
  }
}
