import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobsFilterView extends StatelessWidget {
  final RegularJobsController _regularJobsController =
      Get.find<RegularJobsController>();
  RegularJobsFilterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Fitler by'),
        actions: [
          TextButton(
            onPressed: () => _regularJobsController.resetFilter(),
            child: const LabelText(text: 'Reset Filter'),
          )
        ],
      ),
      body: GetBuilder<RegularJobsController>(
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
                  controller: controller.minSalaryController,
                  textInputType: TextInputType.number,
                  obsecureText: false,
                  icon: Icons.monetization_on,
                  labelText: 'Min Salary',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: controller.maxSalaryController,
                  textInputType: TextInputType.number,
                  obsecureText: false,
                  icon: Icons.monetization_on,
                  labelText: 'Max Salary',
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
                  controller.regularJobs.clear();
                  controller.filterJobs(
                    1,
                    controller.nameController.text,
                    controller.minSalaryController.text,
                    controller.maxSalaryController.text,
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
