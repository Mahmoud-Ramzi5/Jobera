import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
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
                                    MediumHeadlineText(
                                      text:
                                          '${controller.wallet.availableBalance} \$',
                                    ),
                                    const SmallHeadlineText(
                                      text: 'Total Balance:',
                                    ),
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
                                      const BodyText(text: 'Redeem Code')
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: 'Transactions:',
                          widget: ListView.builder(
                            itemCount: controller.transactions.length,
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return Card(
                                margin: const EdgeInsets.all(10),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const BodyText(text: 'From: '),
                                        LabelText(
                                          text: controller
                                              .transactions[index].senderName,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'To: '),
                                        LabelText(
                                          text: controller
                                              .transactions[index].receiverName,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Job Title: '),
                                        LabelText(
                                          text: controller
                                              .transactions[index].jobTitle,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Amount: '),
                                        LabelText(
                                          text:
                                              '${controller.transactions[index].amount}\$',
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Date: '),
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
