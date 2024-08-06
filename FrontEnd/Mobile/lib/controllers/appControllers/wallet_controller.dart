import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/wallet.dart';

class WalletController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late Wallet wallet;
  late TextEditingController codeController;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    wallet = Wallet.empty();
    codeController = TextEditingController();
    await fetchWallet();
    loading = false;
    update();
    super.onInit();
  }

  Future<void> fetchWallet() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/profile/wallet',
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
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> redeemCode(String code) async {
    Dialogs().loadingDialog();
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.107:8000/api/redeemcode',
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
          'Success',
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
        'Failed to reedem code',
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
}
