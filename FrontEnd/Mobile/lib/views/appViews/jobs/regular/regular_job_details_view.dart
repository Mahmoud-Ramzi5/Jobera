import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
        title: const TitleText(text: 'Job Details'),
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
                        Column(
                          children: [
                            ProfilePhotoContainer(
                              height: 200,
                              width: 200,
                              child: controller.regularJob.photo != null
                                  ? CustomImage(
                                      path: controller.regularJob.photo
                                          .toString(),
                                    )
                                  : Icon(
                                      Icons.work,
                                      color: Colors.lightBlue.shade900,
                                      size: 100,
                                    ),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                if (controller.regularJob.poster.userId ==
                                        controller.homeController.company?.id &&
                                    !controller.regularJob.isDone)
                                  IconButton(
                                    onPressed: () => Dialogs().confirmDialog(
                                      'Notice:',
                                      'Are you sure you want to delete post?',
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
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoContainer(
                                name: 'Details',
                                widget: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Row(
                                      children: [
                                        const BodyText(text: 'Job Title: '),
                                        Flexible(
                                          child: LabelText(
                                            text: controller.regularJob.title,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Job Type: '),
                                        LabelText(
                                          text: controller.regularJob.type,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Description: '),
                                        Flexible(
                                          child: LabelText(
                                            text: controller
                                                .regularJob.description,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Location: '),
                                        controller.regularJob.state != null
                                            ? LabelText(
                                                text:
                                                    '${controller.regularJob.country}-${controller.regularJob.state}',
                                              )
                                            : const LabelText(text: 'Remotely'),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Published by: '),
                                        Flexible(
                                          child: TextButton(
                                            onPressed: () =>
                                                controller.viewUserProfile(
                                              controller
                                                  .regularJob.poster.userId,
                                              controller.regularJob.poster.name,
                                              'company',
                                            ),
                                            child: Text(
                                              controller.regularJob.poster.name,
                                              style: TextStyle(
                                                color: Colors.orange.shade800,
                                                decoration:
                                                    TextDecoration.underline,
                                                decorationColor:
                                                    Colors.lightBlue.shade900,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Publish Date: '),
                                        LabelText(
                                          text:
                                              '${controller.regularJob.publishDate.day}/${controller.regularJob.publishDate.month}/${controller.regularJob.publishDate.year}',
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(
                                          text: 'Salary: ',
                                        ),
                                        LabelText(
                                          text:
                                              '${controller.regularJob.salary}\$',
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoContainer(
                            name: 'Required Skills',
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
                                    ? 'Be a competitor'
                                    : null,
                            icon: Icons.add,
                            onPressed: () => Get.toNamed('/applyRegularJob'),
                            name: 'Competitors',
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
                                                              .usedId ==
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
                                        const BodyText(text: 'Rating:'),
                                        Row(
                                          children: [
                                            const BodyText(text: 'Name:'),
                                            TextButton(
                                              onPressed: () =>
                                                  controller.viewUserProfile(
                                                controller.regularJob
                                                    .competitors[index].userId,
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
                                                  color: Colors.orange.shade800,
                                                  decoration:
                                                      TextDecoration.underline,
                                                  decorationColor:
                                                      Colors.lightBlue.shade900,
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            const BodyText(
                                                text: 'Description:'),
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