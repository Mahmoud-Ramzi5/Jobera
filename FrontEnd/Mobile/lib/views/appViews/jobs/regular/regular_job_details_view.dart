import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
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
      ),
      body: GetBuilder<RegularJobDetailsController>(
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
                                          text:
                                              controller.regularJob.description,
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
                                              controller.viewUserProfile(),
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
                                        text: controller.regularJob.salary
                                            .toString(),
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
                      )
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
