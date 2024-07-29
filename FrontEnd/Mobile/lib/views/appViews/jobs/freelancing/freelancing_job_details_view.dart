import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';

class FreelancingJobDetailsView extends StatelessWidget {
  final FreelancingJobDetailsController _freelancingJobDetailsController =
      Get.put(FreelancingJobDetailsController());

  FreelancingJobDetailsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Job Details'),
        leading: IconButton(
          onPressed: () => _freelancingJobDetailsController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
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
                        Column(
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
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                if (controller.freelancingJob.poster.userId ==
                                        controller.homeController.company?.id ||
                                    controller.freelancingJob.poster.userId ==
                                        controller.homeController.user?.id)
                                  IconButton(
                                    onPressed: () => Dialogs().confirmDialog(
                                      'Notice:',
                                      'Are you sure you want to delete post?',
                                      () => _freelancingJobDetailsController
                                          .deleteJob(
                                        _freelancingJobDetailsController
                                            .freelancingJob.defJobId,
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
                                            text:
                                                controller.freelancingJob.title,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Job Type: '),
                                        LabelText(
                                          text: controller.freelancingJob.type,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Description: '),
                                        Flexible(
                                          child: LabelText(
                                            text: controller
                                                .freelancingJob.description,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Location: '),
                                        controller.freelancingJob.state != null
                                            ? LabelText(
                                                text:
                                                    '${controller.freelancingJob.country}-${controller.freelancingJob.state}',
                                              )
                                            : const LabelText(text: 'Remotely'),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Deadline: '),
                                        LabelText(
                                          text:
                                              '${controller.freelancingJob.deadline.day}/${controller.freelancingJob.deadline.month}/${controller.freelancingJob.deadline.year}',
                                        ),
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
                                                  .freelancingJob.poster.userId,
                                              controller
                                                  .freelancingJob.poster.name,
                                              controller
                                                  .freelancingJob.poster.type
                                                  .toString(),
                                            ),
                                            child: Text(
                                              controller
                                                  .freelancingJob.poster.name,
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
                                              '${controller.freelancingJob.publishDate.day}/${controller.freelancingJob.publishDate.month}/${controller.freelancingJob.publishDate.year}',
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(
                                          text: 'Offer Range:',
                                        ),
                                        LabelText(
                                          text:
                                              '${controller.freelancingJob.minOffer}\$-${controller.freelancingJob.maxOffer}\$',
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Avg offer: '),
                                        LabelText(
                                          text:
                                              '${controller.freelancingJob.avgOffer}\$',
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
                            buttonText:
                                controller.freelancingJob.acceptedUser ==
                                            null &&
                                        !controller.homeController.isCompany &&
                                        !controller.applied
                                    ? 'Be a competitor'
                                    : null,
                            icon: Icons.add,
                            onPressed: () {},
                            name: 'Competitors',
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
                                                MainAxisAlignment.spaceEvenly,
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
                                              const BodyText(text: 'Rating:'),
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
                                                )
                                            ],
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            const BodyText(text: 'Name:'),
                                            TextButton(
                                              onPressed: () =>
                                                  controller.viewUserProfile(
                                                controller.freelancingJob
                                                    .competitors[index].userId,
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
                                                    .freelancingJob
                                                    .competitors[index]
                                                    .description,
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            const BodyText(text: 'Offer:'),
                                            Flexible(
                                              child: LabelText(
                                                text:
                                                    '${controller.freelancingJob.competitors[index].offer}\$',
                                              ),
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
