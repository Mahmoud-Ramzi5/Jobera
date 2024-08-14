import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';

class FreelancingJobDetailsView extends StatelessWidget {
  final FreelancingJobDetailsController _freelancingJobDetailsController =
      Get.put(FreelancingJobDetailsController());

  FreelancingJobDetailsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '118'.tr),
        leading: IconButton(
          onPressed: () => _freelancingJobDetailsController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
        actions: [
          if ((_freelancingJobDetailsController.freelancingJob.poster.userId ==
                      _freelancingJobDetailsController
                          .homeController.company?.id ||
                  _freelancingJobDetailsController
                          .freelancingJob.poster.userId ==
                      _freelancingJobDetailsController
                          .homeController.user?.id) &&
              _freelancingJobDetailsController.freelancingJob.acceptedUser ==
                  null)
            IconButton(
              onPressed: () => Dialogs().confirmDialog(
                '46'.tr,
                '119'.tr,
                () => _freelancingJobDetailsController.deleteJob(
                  _freelancingJobDetailsController.freelancingJob.defJobId,
                ),
              ),
              icon: const Icon(
                Icons.delete,
                color: Colors.red,
              ),
            )
        ],
      ),
      body: RefreshIndicator(
        key: _freelancingJobDetailsController.refreshIndicatorKey,
        onRefresh: () => _freelancingJobDetailsController.fetchFreelancingJob(
          _freelancingJobDetailsController.freelancingJob.defJobId,
        ),
        child: GetBuilder<FreelancingJobDetailsController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: Column(
                      children: [
                        Center(
                          child: ProfilePhotoContainer(
                            height: 200,
                            width: 200,
                            child: controller.freelancingJob.photo != null
                                ? CustomImage(
                                    path: controller.freelancingJob.photo
                                        .toString(),
                                  )
                                : Icon(
                                    Icons.laptop,
                                    color: Colors.lightBlue.shade900,
                                    size: 100,
                                  ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              if ((controller.freelancingJob.poster.userId ==
                                      controller.homeController.id) &&
                                  controller.freelancingJob.acceptedUser !=
                                      null &&
                                  !controller.freelancingJob.isDone)
                                OutlinedButton(
                                  onPressed: () async {
                                    await controller.endJob(
                                      controller.freelancingJob.defJobId,
                                      controller.freelancingJob.poster.userId,
                                      controller
                                          .freelancingJob.acceptedUser!.usedId,
                                      controller
                                          .freelancingJob.acceptedUser!.offer,
                                    );
                                    await controller.rateUser(
                                      controller.freelancingJob.poster.userId,
                                      controller
                                          .freelancingJob.acceptedUser!.usedId,
                                    );
                                  },
                                  child: BodyText(text: '126'.tr),
                                ),
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: FreelancingJobDetailsComponent(
                            jobTitle: controller.freelancingJob.title,
                            jobType: controller.freelancingJob.type,
                            description: controller.freelancingJob.description,
                            deadline: controller.freelancingJob.deadline,
                            publishedBy: controller.freelancingJob.poster.name,
                            publishDate: controller.freelancingJob.publishDate,
                            minOffer: controller.freelancingJob.minOffer,
                            maxOffer: controller.freelancingJob.maxOffer,
                            avgOffer: controller.freelancingJob.avgOffer,
                            state: controller.freelancingJob.state,
                            country: controller.freelancingJob.country,
                            onPressed: () => controller.viewUserProfile(
                              controller.freelancingJob.poster.userId,
                              controller.freelancingJob.poster.name,
                              controller.freelancingJob.poster.type.toString(),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoContainer(
                            name: '120'.tr,
                            widget: ListView.builder(
                              itemCount: controller
                                  .freelancingJob.requiredSkills.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                final firstIndex = index * 2;
                                final secondIndex = firstIndex + 1;
                                return Row(
                                  children: [
                                    if (firstIndex <
                                        controller.freelancingJob.requiredSkills
                                            .length)
                                      Expanded(
                                        flex: 1,
                                        child: Padding(
                                          padding: const EdgeInsets.all(5),
                                          child: Chip(
                                            label: BodyText(
                                              text: controller
                                                  .freelancingJob
                                                  .requiredSkills[firstIndex]
                                                  .name,
                                            ),
                                          ),
                                        ),
                                      ),
                                    if (secondIndex <
                                        controller.freelancingJob.requiredSkills
                                            .length)
                                      Expanded(
                                        flex: 1,
                                        child: Padding(
                                          padding: const EdgeInsets.all(5),
                                          child: Chip(
                                            label: BodyText(
                                              text: controller
                                                  .freelancingJob
                                                  .requiredSkills[secondIndex]
                                                  .name,
                                            ),
                                          ),
                                        ),
                                      ),
                                  ],
                                );
                              },
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoContainer(
                            buttonText: controller
                                            .freelancingJob.acceptedUser ==
                                        null &&
                                    controller.freelancingJob.poster.userId !=
                                        controller.homeController.id &&
                                    !controller.applied
                                ? '121'.tr
                                : null,
                            icon: Icons.add,
                            onPressed: () =>
                                Get.toNamed('/applyFreelancingJob'),
                            name: '122'.tr,
                            widget: ListView.builder(
                              itemCount:
                                  controller.freelancingJob.competitors.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: ListContainer(
                                    color: Colors.lightBlue.shade900,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              ProfilePhotoContainer(
                                                child: controller
                                                            .freelancingJob
                                                            .competitors[index]
                                                            .photo !=
                                                        null
                                                    ? CustomImage(
                                                        path: controller
                                                            .freelancingJob
                                                            .photo
                                                            .toString(),
                                                      )
                                                    : Icon(
                                                        controller
                                                                    .freelancingJob
                                                                    .competitors[
                                                                        index]
                                                                    .type ==
                                                                'company'
                                                            ? Icons.business
                                                            : Icons.person,
                                                        color: Colors
                                                            .lightBlue.shade900,
                                                        size: 50,
                                                      ),
                                              ),
                                              if (controller.freelancingJob
                                                          .acceptedUser !=
                                                      null &&
                                                  controller
                                                          .freelancingJob
                                                          .acceptedUser!
                                                          .usedId ==
                                                      controller
                                                          .freelancingJob
                                                          .competitors[index]
                                                          .userId)
                                                Icon(
                                                  Icons.verified_user,
                                                  color:
                                                      Colors.lightBlue.shade900,
                                                ),
                                              if (controller.freelancingJob
                                                          .poster.userId ==
                                                      controller
                                                          .homeController.id &&
                                                  controller.freelancingJob
                                                          .acceptedUser ==
                                                      null)
                                                Column(
                                                  children: [
                                                    IconButton(
                                                      onPressed: () =>
                                                          controller.acceptUser(
                                                              controller
                                                                  .freelancingJob
                                                                  .competitors[
                                                                      index]
                                                                  .competitorId,
                                                              controller
                                                                  .freelancingJob
                                                                  .defJobId,
                                                              controller
                                                                  .freelancingJob
                                                                  .competitors[
                                                                      index]
                                                                  .offer),
                                                      icon: const Icon(
                                                        Icons.check,
                                                        color: Colors.green,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                            ],
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '24'.tr),
                                            RatingBar.builder(
                                              initialRating: controller
                                                      .freelancingJob
                                                      .competitors[index]
                                                      .rating ??
                                                  0.0,
                                              allowHalfRating: true,
                                              itemCount: 5,
                                              itemBuilder: (context, index) {
                                                return Icon(
                                                  Icons.star,
                                                  color:
                                                      Colors.lightBlue.shade900,
                                                );
                                              },
                                              itemSize: 25,
                                              ignoreGestures: true,
                                              onRatingUpdate: (value) {},
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '6'.tr),
                                            Flexible(
                                              child: TextButton(
                                                onPressed: () =>
                                                    controller.viewUserProfile(
                                                  controller
                                                      .freelancingJob
                                                      .competitors[index]
                                                      .userId,
                                                  controller.freelancingJob
                                                      .competitors[index].name,
                                                  controller.freelancingJob
                                                      .competitors[index].type
                                                      .toString(),
                                                ),
                                                child: Text(
                                                  controller.freelancingJob
                                                      .competitors[index].name,
                                                  style: TextStyle(
                                                    color:
                                                        Colors.orange.shade800,
                                                    decoration: TextDecoration
                                                        .underline,
                                                    decorationColor: Colors
                                                        .lightBlue.shade900,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '26'.tr),
                                            Flexible(
                                              child: LabelText(
                                                text: controller
                                                    .freelancingJob
                                                    .competitors[index]
                                                    .description,
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '89'.tr),
                                            Flexible(
                                              child: LabelText(
                                                text:
                                                    '${controller.freelancingJob.competitors[index].offer}\$',
                                              ),
                                            ),
                                          ],
                                        ),
                                        if (controller
                                                    .freelancingJob
                                                    .competitors[index]
                                                    .userId ==
                                                controller.homeController.id &&
                                            controller.freelancingJob
                                                    .acceptedUser ==
                                                null &&
                                            controller.isEditOffer)
                                          Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: Form(
                                              key: controller.formField,
                                              child: CustomTextField(
                                                controller: controller
                                                    .editOfferController,
                                                textInputType:
                                                    TextInputType.number,
                                                obsecureText: false,
                                                icon: Icons.monetization_on,
                                                labelText: '89'.tr,
                                                validator: (p0) =>
                                                    Validation().validateOffer(
                                                  p0,
                                                  controller
                                                      .freelancingJob.minOffer,
                                                  controller
                                                      .freelancingJob.maxOffer,
                                                ),
                                              ),
                                            ),
                                          ),
                                        if (controller
                                                    .freelancingJob
                                                    .competitors[index]
                                                    .userId ==
                                                controller.homeController.id &&
                                            controller.freelancingJob
                                                    .acceptedUser ==
                                                null &&
                                            !controller.isEditOffer)
                                          OutlinedButton(
                                              onPressed: () =>
                                                  controller.editOffer(index),
                                              child: BodyText(text: '128'.tr)),
                                        if (controller
                                                    .freelancingJob
                                                    .competitors[index]
                                                    .userId ==
                                                controller.homeController.id &&
                                            controller.freelancingJob
                                                    .acceptedUser ==
                                                null &&
                                            controller.isEditOffer)
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            children: [
                                              OutlinedButton(
                                                onPressed: () => controller
                                                    .cancelEditOffer(),
                                                child: BodyText(text: '138'.tr),
                                              ),
                                              OutlinedButton(
                                                onPressed: () {
                                                  if (controller.formField
                                                          .currentState
                                                          ?.validate() ==
                                                      true) {
                                                    controller.changeOffer(
                                                      controller.freelancingJob
                                                          .defJobId,
                                                      controller
                                                          .editOfferController
                                                          .text,
                                                    );
                                                  }
                                                },
                                                child: BodyText(text: '23'.tr),
                                              ),
                                            ],
                                          )
                                      ],
                                    ),
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
      ),
    );
  }
}
