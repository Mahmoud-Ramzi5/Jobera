import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
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
      ),
      body: GetBuilder<FreelancingJobDetailsController>(
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
                                          text: controller.freelancingJob.title,
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
                                          onPressed: () {},
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
                            itemCount:
                                controller.freelancingJob.requiredSkills.length,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              final firstIndex = index * 2;
                              final secondIndex = firstIndex + 1;
                              return Row(
                                children: [
                                  if (firstIndex <
                                      controller
                                          .freelancingJob.requiredSkills.length)
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
                                      controller
                                          .freelancingJob.requiredSkills.length)
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
                      )
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
