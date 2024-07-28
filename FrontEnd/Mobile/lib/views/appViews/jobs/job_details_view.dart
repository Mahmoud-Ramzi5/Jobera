import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/texts.dart';

class JobDetailsView extends StatelessWidget {
  final JobDetailsController _jobDetailsController =
      Get.put(JobDetailsController());

  JobDetailsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Job Details'),
      ),
      body: GetBuilder<JobDetailsController>(
        builder: (controller) => SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              children: [
                JobDetailsComponent(
                  photo: controller.job.photo,
                  title: controller.job.title,
                  type: controller.job.type,
                  description: controller.job.description,
                  publishedBy: controller.job.poster.name,
                  publishDate: controller.job.publishDate,
                  isFreelancing: controller.isFreelancing,
                  country: controller.job.country,
                  state: controller.job.state,
                  salary:
                      controller.isFreelancing ? null : controller.job.salary,
                  deadline:
                      controller.isFreelancing ? controller.job.deadline : null,
                  minOffer:
                      controller.isFreelancing ? controller.job.minOffer : null,
                  maxOffer:
                      controller.isFreelancing ? controller.job.maxOffer : null,
                  avgOffer:
                      controller.isFreelancing ? controller.job.avgOffer : null,
                  onPressed: () {},
                ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: InfoContainer(
                    name: 'Required Skills',
                    widget: ListView.builder(
                      itemCount: controller.job.requiredSkills.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        final firstIndex = index * 2;
                        final secondIndex = firstIndex + 1;
                        return Row(
                          children: [
                            if (firstIndex <
                                controller.job.requiredSkills.length)
                              Expanded(
                                flex: 1,
                                child: Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: Chip(
                                    label: BodyText(
                                      text: controller
                                          .job.requiredSkills[firstIndex].name,
                                    ),
                                  ),
                                ),
                              ),
                            if (secondIndex <
                                controller.job.requiredSkills.length)
                              Expanded(
                                flex: 1,
                                child: Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: Chip(
                                    label: BodyText(
                                      text: controller
                                          .job.requiredSkills[secondIndex].name,
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
