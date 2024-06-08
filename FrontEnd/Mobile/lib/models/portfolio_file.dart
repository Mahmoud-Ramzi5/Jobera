class PortfolioFile {
  final int id;
  final String name;
  final String path;

  PortfolioFile({
    required this.id,
    required this.name,
    required this.path,
  });

  PortfolioFile.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        path = json['path'] as String;
}
