import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/transaction.dart';
import 'package:jobera/models/wallet.dart';

class WalletController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late Wallet wallet;
  late TextEditingController codeController;
  bool loading = true;
  List<Transaction> transactions = [];

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    wallet = Wallet.empty();
    codeController = TextEditingController();
    await fetchWallet();
    await fetchTransactions();
    loading = false;
    update();
    super.onInit();
  }

  Future<void> fetchWallet() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/profile/wallet',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        wallet = Wallet.fromJson(response.data['wallet']);
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> redeemCode(String code) async {
    Dialogs().loadingDialog();
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.39.51:8000/api/redeemcode',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
        data: {
          'code': code,
        },
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        codeController.clear();
        Get.back();
        Dialogs().showSuccessDialog(
          '155'.tr,
          '',
        );
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.back();
            Get.back();
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        '163'.tr,
        e.response!.data['errors'].toString(),
      );
      Future.delayed(
        const Duration(seconds: 1),
        () {
          Get.back();
          Get.back();
        },
      );
    }
  }

  Future<void> fetchTransactions() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/transactions',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        transactions = [
          for (var transaction in response.data['transactions'])
            Transaction.fromJson(transaction),
        ];
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        '153'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }
}
