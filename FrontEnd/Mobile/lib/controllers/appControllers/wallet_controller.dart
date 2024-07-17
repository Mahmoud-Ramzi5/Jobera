import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/models/wallet.dart';

class WalletController extends GetxController {
  late HomeController homeController;
  //late Wallet wallet;

  @override
  void onInit() {
    homeController = Get.find<HomeController>();
    //wallet = homeController.user!.wallet;
    super.onInit();
  }
}
