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
        title: TitleText(text: '71'.tr),
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
                                    SmallHeadlineText(text: '72'.tr),
                                    MediumHeadlineText(
                                      text:
                                          '${controller.wallet.availableBalance} \$',
                                    ),
                                    SmallHeadlineText(text: '73'.tr),
                                    MediumHeadlineText(
                                      text:
                                          '${controller.wallet.totalBalance} \$',
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
                                      BodyText(text: '74'.tr)
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                      ExpansionTile(
                        title: BodyText(text: '75'.tr),
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: ListView.builder(
                              itemCount: controller.transactions.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Card(
                                  margin: const EdgeInsets.all(10),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          BodyText(text: '76'.tr),
                                          LabelText(
                                            text: controller
                                                .transactions[index].senderName,
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          BodyText(text: '77'.tr),
                                          LabelText(
                                            text: controller.transactions[index]
                                                .receiverName,
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          BodyText(text: '78'.tr),
                                          LabelText(
                                            text: controller
                                                .transactions[index].jobTitle,
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          BodyText(text: '79'.tr),
                                          LabelText(
                                            text:
                                                '${controller.transactions[index].amount}\$',
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          BodyText(text: '80'.tr),
                                          LabelText(
                                              text:
                                                  '${controller.transactions[index].date.day}/${controller.transactions[index].date.month}/${controller.transactions[index].date.year} ${controller.transactions[index].date.hour}:${controller.transactions[index].date.minute}'),
                                        ],
                                      )
                                    ],
                                  ),
                                );
                              },
                            ),
                          )
                        ],
                      )
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
