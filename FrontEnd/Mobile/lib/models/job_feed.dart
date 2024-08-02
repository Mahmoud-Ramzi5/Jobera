class MostPayedRegJobs {
  final int id;
  final String title;
  final double salary;

  MostPayedRegJobs({
    required this.id,
    required this.title,
    required this.salary,
  });

  MostPayedRegJobs.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        title = json['title'] as String,
        salary = double.parse(json['salary']);
}

class MostPayedFreelancingJobs {
  final int id;
  final String title;
  final double salary;

  MostPayedFreelancingJobs({
    required this.id,
    required this.title,
    required this.salary,
  });

  MostPayedFreelancingJobs.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        title = json['title'] as String,
        salary = double.parse(json['salary']);
}

class MostPostingCompanies {
  final int id;
  final String title;
  final int count;

  MostPostingCompanies({
    required this.id,
    required this.title,
    required this.count,
  });

  MostPostingCompanies.fromJson(Map<String, dynamic> json)
      : id = json['company_id'] as int,
        title = json['title'] as String,
        count = json['count'] as int;
}

class MostNeededSkills {
  final int skillId;
  final String title;
  final int count;

  MostNeededSkills({
    required this.skillId,
    required this.title,
    required this.count,
  });

  MostNeededSkills.fromJson(Map<String, dynamic> json)
      : skillId = json['skill_id'] as int,
        title = json['title'] as String,
        count = json['count'] as int;
}

class Stat {
  final int stat;
  final String name;

  Stat({
    required this.stat,
    required this.name,
  });

  Stat.fromJson(Map<String, dynamic> json)
      : stat = json['data'] as int,
        name = json['name'] as String;
}
