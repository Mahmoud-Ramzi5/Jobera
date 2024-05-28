import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_skills_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class UserEditSkillsView extends StatelessWidget {
  final UserEditSkillsController _editController =
      Get.put(UserEditSkillsController());

  UserEditSkillsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Edit Skills'),
        actions: [
          TextButton(
            onPressed: () => _editController.editSkills(),
            child: const LabelText(text: 'Submit'),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            GetBuilder<UserEditSkillsController>(
              builder: (controller) => Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: SkillsContainer(
                      name: 'My Skills',
                      widget: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: (controller.myskills.length / 2).ceil(),
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          final firstIndex = index * 2;
                          final secondIndex = firstIndex + 1;
                          return Row(
                            children: [
                              if (firstIndex < controller.myskills.length)
                                Expanded(
                                  flex: 1,
                                  child: Padding(
                                    padding: const EdgeInsets.all(5),
                                    child: InputChip(
                                      deleteIcon: const Icon(Icons.cancel),
                                      onDeleted: () {
                                        controller.deleteSkill(
                                            controller.myskills[firstIndex]);
                                      },
                                      label: BodyText(
                                        text: controller
                                            .myskills[firstIndex].name,
                                      ),
                                    ),
                                  ),
                                ),
                              if (secondIndex < controller.myskills.length)
                                Expanded(
                                    flex: 1,
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: InputChip(
                                        deleteIcon: const Icon(Icons.cancel),
                                        onDeleted: () {
                                          controller.deleteSkill(
                                              controller.myskills[secondIndex]);
                                        },
                                        label: BodyText(
                                          text: controller
                                              .myskills[secondIndex].name,
                                        ),
                                      ),
                                    )),
                            ],
                          );
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: SkillsContainer(
                      name: 'Skill Types:',
                      widget: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.skillTypes.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(10),
                            child: ListContainer(
                              child: BodyText(
                                  text: controller
                                      .skillTypes[index].value['en']!),
                              onTap: () {
                                controller.getSkills(
                                    controller.skillTypes[index].name);
                              },
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: SearchBar(
                      hintText: 'Search',
                      leading: Icon(
                        Icons.search,
                        color: Colors.lightBlue.shade900,
                      ),
                      onChanged: (value) => _editController.searchSkills(value),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: SkillsContainer(
                      name: 'Skills:',
                      widget: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: (controller.skills.length / 2).ceil(),
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          final firstIndex = index * 2;
                          final secondIndex = firstIndex + 1;
                          return Row(
                            children: [
                              if (firstIndex < controller.skills.length)
                                Expanded(
                                  flex: 1,
                                  child: Padding(
                                    padding: const EdgeInsets.all(5),
                                    child: InputChip(
                                      label: BodyText(
                                        text:
                                            controller.skills[firstIndex].name,
                                      ),
                                      onPressed: () {
                                        controller.addToOMySkills(
                                          controller.skills[firstIndex],
                                        );
                                      },
                                    ),
                                  ),
                                ),
                              if (secondIndex < controller.skills.length)
                                Expanded(
                                  flex: 1,
                                  child: Padding(
                                    padding: const EdgeInsets.all(5),
                                    child: InputChip(
                                      label: BodyText(
                                        text:
                                            controller.skills[secondIndex].name,
                                      ),
                                      onPressed: () {
                                        controller.addToOMySkills(
                                          controller.skills[secondIndex],
                                        );
                                      },
                                    ),
                                  ),
                                ),
                            ],
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
