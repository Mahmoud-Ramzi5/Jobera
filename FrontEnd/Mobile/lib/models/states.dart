class States {
  final int stateId;
  final String stateName;

  States({required this.stateId, required this.stateName});

  States.fromJson(Map<String, dynamic> json)
      : stateId = json['id'] as int,
        stateName = json['stateName'] as String;
}
