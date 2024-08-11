class Transaction {
  final int id;
  final int senderId;
  final String senderName;
  final int receiverId;
  final String receiverName;
  final int jobId;
  final String jobTitle;
  final double amount;
  final DateTime date;

  Transaction({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.receiverId,
    required this.receiverName,
    required this.jobId,
    required this.jobTitle,
    required this.amount,
    required this.date,
  });

  Transaction.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        senderId = json['sender']['id'] as int,
        senderName = json['sender']['name'] as String,
        receiverId = json['receiver']['id'] as int,
        receiverName = json['receiver']['name'] as String,
        jobId = json['job']['id'] as int,
        jobTitle = json['job']['title'] as String,
        amount = double.parse(json['amount'] as String),
        date = DateTime.parse(json['date'] as String);
}
