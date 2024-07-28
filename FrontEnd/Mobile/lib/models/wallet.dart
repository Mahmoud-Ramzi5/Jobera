class Wallet {
  final int walletid;
  final int userId;
  final double totalBalance;
  final double availableBalance;
  final double reservedBalance;

  Wallet({
    required this.walletid,
    required this.userId,
    required this.totalBalance,
    required this.availableBalance,
    required this.reservedBalance,
  });

  Wallet.fromJson(Map<String, dynamic> json)
      : walletid = json['id'] as int,
        userId = json['user_id'] as int,
        totalBalance = double.parse(json['total_balance']),
        availableBalance = double.parse(json['available_balance']),
        reservedBalance = double.parse(json['reserved_balance']);

  Wallet.empty()
      : walletid = 0,
        userId = 0,
        totalBalance = 0,
        availableBalance = 0,
        reservedBalance = 0;
}
