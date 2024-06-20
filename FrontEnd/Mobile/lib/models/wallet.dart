class Wallet {
  final int id;
  final int userId;
  final int currentBalance;
  final int availableBalance;
  final int reservedBalance;

  Wallet({
    required this.id,
    required this.userId,
    required this.currentBalance,
    required this.availableBalance,
    required this.reservedBalance,
  });

  Wallet.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        userId = json['user_id'] as int,
        currentBalance = json['current_balance'] as int,
        availableBalance = json['available_balance'] as int,
        reservedBalance = json['reserved_balance'] as int;

  Wallet.empty()
      : id = 0,
        userId = 0,
        currentBalance = 0,
        availableBalance = 0,
        reservedBalance = 0;
}
