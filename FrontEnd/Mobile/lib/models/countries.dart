class Countries {
  final int countryId;
  final String countryName;

  Countries({required this.countryId, required this.countryName});

  Countries.fromJson(Map<String, dynamic> json)
      : countryId = json['id'] as int,
        countryName = json['country_name'] as String;

  static List<Countries> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Countries.fromJson(json)).toList();
  }
}
