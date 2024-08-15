import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/manage/manage_offers_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class ManageOffersView extends StatelessWidget {
  final ManageOffersController _manageOffersController =
      Get.put(ManageOffersController());

  ManageOffersView({super.key});

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      key: _manageOffersController.refreshIndicatorKey,
      onRefresh: () async => await _manageOffersController.refreshView(),
      child: GetBuilder<ManageOffersController>(
        builder: (controller) => Scaffold(
          body: controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  controller: controller.scrollController,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            OutlinedButton(
                              onPressed: () async =>
                                  controller.getFreelancingPosts(),
                              child: BodyText(text: '99'.tr),
                            ),
                            if (!controller.homeController.isCompany)
                              OutlinedButton(
                                onPressed: () async =>
                                    controller.getRegularPosts(),
                                child: BodyText(text: '98'.tr),
                              ),
                          ],
                        ),
                      ),
                      controller.offerType == 'Freelancing'
                          ? Column(
                              children: [
                                ListView.builder(
                                  shrinkWrap: true,
                                  itemCount: controller.freelancingOffer.length,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemBuilder: (context, index) {
                                    return GestureDetector(
                                      onTap: () =>
                                          controller.viewFreelancingJob(
                                        controller
                                            .freelancingOffer[index].defJobId,
                                      ),
                                      child: Card(
                                        margin: const EdgeInsets.all(10),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(10),
                                          ),
                                          side: BorderSide(
                                            color: Colors.lightBlue.shade900,
                                            width: 2,
                                          ),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: FreelancingOfferComponent(
                                              photo: controller
                                                  .freelancingOffer[index]
                                                  .jobPhoto,
                                              jobTitle: controller
                                                  .freelancingOffer[index]
                                                  .jobTitle,
                                              jobType: controller
                                                  .freelancingOffer[index]
                                                  .jobType,
                                              comment: controller
                                                  .freelancingOffer[index]
                                                  .description,
                                              status: controller
                                                  .freelancingOffer[index]
                                                  .status,
                                              offer: controller
                                                  .freelancingOffer[index]
                                                  .offer),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                controller.paginationData.hasMorePages
                                    ? const Center(
                                        child: CircularProgressIndicator(),
                                      )
                                    : SingleChildScrollView(
                                        child: SizedBox(
                                          height: Get.height,
                                          child: BodyText(
                                            text: '112'.tr,
                                          ),
                                        ),
                                      )
                              ],
                            )
                          : Column(
                              children: [
                                ListView.builder(
                                  shrinkWrap: true,
                                  itemCount: controller.regularOffers.length,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemBuilder: (context, index) {
                                    return GestureDetector(
                                      onTap: () => controller.viewRegularJob(
                                        controller
                                            .regularOffers[index].defJobId,
                                      ),
                                      child: Card(
                                        margin: const EdgeInsets.all(10),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(10),
                                          ),
                                          side: BorderSide(
                                            color: controller
                                                        .regularOffers[index]
                                                        .jobType ==
                                                    'FullTime'
                                                ? Colors.lightBlue.shade900
                                                : Colors.orange.shade800,
                                            width: 2,
                                          ),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: RegularOfferComponent(
                                            photo: controller
                                                .regularOffers[index].jobPhoto,
                                            jobTitle: controller
                                                .regularOffers[index].jobTitle,
                                            jobType: controller
                                                .regularOffers[index].jobType,
                                            comment: controller
                                                .regularOffers[index]
                                                .description,
                                            status: controller
                                                .regularOffers[index].status,
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                controller.paginationData.hasMorePages
                                    ? const Center(
                                        child: CircularProgressIndicator(),
                                      )
                                    : SingleChildScrollView(
                                        child: SizedBox(
                                          height: Get.height,
                                          child: BodyText(
                                            text: '112'.tr,
                                          ),
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
