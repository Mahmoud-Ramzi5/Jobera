class PortoFolioFile {
  final int id;
  final String name;
  final String path;

  PortoFolioFile({
    required this.id,
    required this.name,
    required this.path,
  });

  PortoFolioFile.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        path = json['path'] as String;
}
