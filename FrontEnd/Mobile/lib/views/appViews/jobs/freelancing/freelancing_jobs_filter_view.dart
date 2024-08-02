import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/texts.dart';

class FreelancingJobsFilterView extends StatelessWidget {
  final FreelancingJobsController _freelancingJobsController =
      Get.find<FreelancingJobsController>();
  FreelancingJobsFilterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Fitler by'),
        actions: [
          TextButton(
            onPressed: () => _freelancingJobsController.resetFilter(),
            child: const LabelText(text: 'Reset Filter'),
          )
        ],
      ),
      body: GetBuilder<FreelancingJobsController>(
        builder: (controller) => SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: SearchBar(
                  controller: controller.nameController,
                  hintText: 'Published By',
                  leading: Icon(
                    Icons.search,
                    color: Colors.lightBlue.shade900,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: controller.minOfferController,
                  textInputType: TextInputType.number,
                  obsecureText: false,
                  icon: Icons.monetization_on,
                  labelText: 'Min Offer',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: controller.maxOfferController,
                  textInputType: TextInputType.number,
                  obsecureText: false,
                  icon: Icons.monetization_on,
                  labelText: 'Max Offer',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: InfoContainer(
                  name: 'Deadline',
                  widget: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const BodyText(text: 'From:'),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: DateContainer(
                              widget: GestureDetector(
                                onTap: () => controller.selectFromDate(
                                  context,
                                ),
                                child: BodyText(
                                  text: controller.dateFrom != null
                                      ? "${controller.dateFrom}".split(' ')[0]
                                      : 'Pick Date',
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const BodyText(text: 'To:'),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: DateContainer(
                              widget: GestureDetector(
                                onTap: () => controller.selectToDate(
                                  context,
                                ),
                                child: BodyText(
                                  text: controller.dateTo != null
                                      ? "${controller.dateTo}".split(' ')[0]
                                      : 'Pick Date',
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: InfoContainer(
                  name: 'Skills',
                  widget: Padding(
                    padding: const EdgeInsets.all(10),
                    child: ExpansionTile(
                      title: const BodyText(text: 'Expand'),
                      children: [
                        ListView.builder(
                          itemCount: controller.skills.length,
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) {
                            return Row(
                              children: [
                                Flexible(
                                  child: BodyText(
                                    text: controller.skills[index].name,
                                  ),
                                ),
                                Checkbox(
                                  activeColor: Colors.orange.shade800,
                                  value: controller.selectedSkills[index],
                                  onChanged: (value) =>
                                      controller.selectSkill(index),
                                ),
                              ],
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              OutlinedButton(
                onPressed: () {
                  controller.freelancingJobs.clear();
                  controller.filterJobs(
                    1,
                    controller.nameController.text,
                    controller.minOfferController.text,
                    controller.maxOfferController.text,
                    controller.dateFrom,
                    controller.dateTo,
                    controller.skillNames,
                  );
                },
                child: const BodyText(text: 'Submit Filter'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
