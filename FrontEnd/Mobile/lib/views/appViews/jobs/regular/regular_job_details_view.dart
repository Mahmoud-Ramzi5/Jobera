import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobDetailsView extends StatelessWidget {
  final RegularJobDetailsController _regularJobDetailsController =
      Get.put(RegularJobDetailsController());

  RegularJobDetailsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '118'.tr),
        leading: IconButton(
          onPressed: () => _regularJobDetailsController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _regularJobDetailsController.refreshIndicatorKey,
        onRefresh: () => _regularJobDetailsController.fetchRegularJob(
          _regularJobDetailsController.regularJobsController.jobDetailsId,
        ),
        child: GetBuilder<RegularJobDetailsController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: Column(
                      children: [
                        ProfilePhotoContainer(
                          height: 200,
                          width: 200,
                          child: controller.regularJob.photo != null
                              ? CustomImage(
                                  path: controller.regularJob.photo.toString(),
                                )
                              : Icon(
                                  Icons.work,
                                  color: Colors.lightBlue.shade900,
                                  size: 100,
                                ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              if (controller.regularJob.poster.userId ==
                                      controller.homeController.company?.id &&
                                  !controller.regularJob.isDone)
                                IconButton(
                                  onPressed: () => Dialogs().confirmDialog(
                                    '46'.tr,
                                    '119'.tr,
                                    () => controller.deleteJob(
                                      controller.regularJob.defJobId,
                                    ),
                                  ),
                                  icon: const Icon(
                                    Icons.delete,
                                    color: Colors.red,
                                  ),
                                )
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: RegularJobDetailsComponent(
                            jobTitle: controller.regularJob.title,
                            jobType: controller.regularJob.type,
                            description: controller.regularJob.description,
                            publishedBy: controller.regularJob.poster.name,
                            publishDate: controller.regularJob.publishDate,
                            salary: controller.regularJob.salary,
                            state: controller.regularJob.state,
                            country: controller.regularJob.country,
                            onPressed: () => controller.viewUserProfile(
                              controller.regularJob.poster.userId,
                              controller.regularJob.poster.name,
                              'company',
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoContainer(
                            name: '120'.tr,
                            widget: ListView.builder(
                              itemCount:
                                  controller.regularJob.requiredSkills.length,
                              shrinkWrap: true,
                              itemBuilder: (context, index) {
                                final firstIndex = index * 2;
                                final secondIndex = firstIndex + 1;
                                return Row(
                                  children: [
                                    if (firstIndex <
                                        controller
                                            .regularJob.requiredSkills.length)
                                      Expanded(
                                        flex: 1,
                                        child: Padding(
                                          padding: const EdgeInsets.all(5),
                                          child: Chip(
                                            label: BodyText(
                                              text: controller
                                                  .regularJob
                                                  .requiredSkills[firstIndex]
                                                  .name,
                                            ),
                                          ),
                                        ),
                                      ),
                                    if (secondIndex <
                                        controller
                                            .regularJob.requiredSkills.length)
                                      Expanded(
                                        flex: 1,
                                        child: Padding(
                                          padding: const EdgeInsets.all(5),
                                          child: Chip(
                                            label: BodyText(
                                              text: controller
                                                  .regularJob
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
                            buttonText:
                                controller.regularJob.acceptedUser == null &&
                                        !controller.homeController.isCompany &&
                                        !controller.applied &&
                                        controller.regularJob.poster.userId !=
                                            controller.homeController.id
                                    ? '121'.tr
                                    : null,
                            icon: Icons.add,
                            onPressed: () => Get.toNamed('/applyRegularJob'),
                            name: '122'.tr,
                            widget: ListView.builder(
                              itemCount:
                                  controller.regularJob.competitors.length,
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
                                          child: Column(
                                            children: [
                                              Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  ProfilePhotoContainer(
                                                    child: controller
                                                                .regularJob
                                                                .competitors[
                                                                    index]
                                                                .photo !=
                                                            null
                                                        ? CustomImage(
                                                            path: controller
                                                                .regularJob
                                                                .photo
                                                                .toString(),
                                                          )
                                                        : Icon(
                                                            controller
                                                                        .regularJob
                                                                        .competitors[
                                                                            index]
                                                                        .type ==
                                                                    'company'
                                                                ? Icons.business
                                                                : Icons.person,
                                                            color: Colors
                                                                .lightBlue
                                                                .shade900,
                                                            size: 50,
                                                          ),
                                                  ),
                                                  if (controller.regularJob
                                                              .poster.userId ==
                                                          controller
                                                              .homeController
                                                              .id &&
                                                      controller.regularJob
                                                              .acceptedUser ==
                                                          null)
                                                    Column(
                                                      children: [
                                                        IconButton(
                                                          onPressed: () =>
                                                              controller
                                                                  .acceptUser(
                                                            controller
                                                                .regularJob
                                                                .competitors[
                                                                    index]
                                                                .competitorId,
                                                            controller
                                                                .regularJob
                                                                .defJobId,
                                                          ),
                                                          icon: const Icon(
                                                            Icons.check,
                                                            color: Colors.green,
                                                          ),
                                                        ),
                                                        IconButton(
                                                          onPressed: () =>
                                                              controller
                                                                  .createChat(
                                                            controller
                                                                .regularJob
                                                                .competitors[
                                                                    index]
                                                                .userId,
                                                          ),
                                                          icon: Icon(
                                                            Icons.message,
                                                            color: Colors
                                                                .lightBlue
                                                                .shade900,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  if (controller.regularJob
                                                              .acceptedUser !=
                                                          null &&
                                                      controller
                                                              .regularJob
                                                              .acceptedUser!
                                                              .userId ==
                                                          controller
                                                              .regularJob
                                                              .competitors[
                                                                  index]
                                                              .userId)
                                                    Icon(
                                                      Icons.verified_user,
                                                      color: Colors
                                                          .lightBlue.shade900,
                                                    ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '${'24'.tr}: '),
                                            RatingBar.builder(
                                              initialRating: controller
                                                  .regularJob
                                                  .competitors[index]
                                                  .rating,
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
                                            BodyText(text: '${'5'.tr}: '),
                                            Flexible(
                                              child: TextButton(
                                                onPressed: () =>
                                                    controller.viewUserProfile(
                                                  controller
                                                      .regularJob
                                                      .competitors[index]
                                                      .userId,
                                                  controller.regularJob
                                                      .competitors[index].name,
                                                  controller.regularJob
                                                      .competitors[index].type
                                                      .toString(),
                                                ),
                                                child: Text(
                                                  controller.regularJob
                                                      .competitors[index].name,
                                                  style: TextStyle(
                                                    color:
                                                        Colors.orange.shade800,
                                                    decoration: TextDecoration
                                                        .underline,
                                                    decorationColor: Colors
                                                        .lightBlue.shade900,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            BodyText(text: '${'26'.tr}: '),
                                            Flexible(
                                              child: LabelText(
                                                text: controller
                                                    .regularJob
                                                    .competitors[index]
                                                    .description,
                                              ),
                                            ),
                                          ],
                                        ),
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
