class Wallet {
  final int id;
  final int userId;
  final double currentBalance;
  final double availableBalance;
  final double reservedBalance;

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
        currentBalance = double.parse(json['current_balance']),
        availableBalance = double.parse(json['available_balance']),
        reservedBalance = double.parse(json['reserved_balance']);

  Wallet.empty()
      : id = 0,
        userId = 0,
        currentBalance = 0,
        availableBalance = 0,
        reservedBalance = 0;
}
