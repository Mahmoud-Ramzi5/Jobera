class Country {
  final int countryId;
  final String countryName;

  Country({
    required this.countryId,
    required this.countryName,
  });

  Country.fromJson(Map<String, dynamic> json)
      : countryId = json['country_id'] as int,
        countryName = json['country_name'] as String;

  static List<Country> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Country.fromJson(json)).toList();
  }
}
