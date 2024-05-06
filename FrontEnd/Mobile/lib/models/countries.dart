class Countries {
  final int countryId;
  final String countryName;

  Countries({required this.countryId, required this.countryName});

  Countries.fromJson(Map<String, dynamic> json)
      : countryId = json['id'] as int,
        countryName = json['country_name'] as String;
}
