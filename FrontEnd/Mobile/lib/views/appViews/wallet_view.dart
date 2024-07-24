import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/wallet_controller.dart';

class WalletView extends StatelessWidget {
  final WalletController _walletController = Get.put(WalletController());
  WalletView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Wallet'),
      ),
      body: RefreshIndicator(
        key: _walletController.refreshIndicatorKey,
        onRefresh: () => _walletController.fetchWallet(),
        child: GetBuilder<WalletController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 400,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          margin: const EdgeInsets.all(10),
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const SmallHeadlineText(
                                      text: 'Available Balance:',
                                    ),
                                    Text(
                                      '${controller.wallet.currentBalance} SYP',
                                      style: Theme.of(context)
                                          .textTheme
                                          .headlineMedium,
                                    ),
                                    const SmallHeadlineText(
                                      text: 'Total Balance:',
                                    ),
                                    Text(
                                      '${controller.wallet.availableBalance} SYP',
                                      style: Theme.of(context)
                                          .textTheme
                                          .headlineMedium,
                                    ),
                                  ],
                                ),
                                IconButton(
                                  onPressed: () => Dialogs().redeemCodeDialog(
                                    controller.codeController,
                                    () => controller.redeemCode(
                                      controller.codeController.text,
                                    ),
                                  ),
                                  icon: Row(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.all(5),
                                        child: Icon(
                                          Icons.add_circle,
                                          color: Colors.orange.shade800,
                                        ),
                                      ),
                                      const BodyText(text: 'Redeem Code')
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
