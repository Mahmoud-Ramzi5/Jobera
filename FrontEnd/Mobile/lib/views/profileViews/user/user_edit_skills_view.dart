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
                        itemCount: (controller.myskills.length),
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(5),
                            child: InputChip(
                              deleteIcon: const Icon(Icons.cancel),
                              onDeleted: () {
                                controller
                                    .deleteSkill(controller.myskills[index]);
                              },
                              label: BodyText(
                                text: controller.myskills[index].name,
                              ),
                            ),
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
                              text: controller.skillTypes[index].value['en']!,
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
                        itemCount: controller.skills.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(5),
                            child: InputChip(
                              label: BodyText(
                                text: controller.skills[index].name,
                              ),
                              onPressed: () {
                                controller.addToOMySkills(
                                  controller.skills[index],
                                );
                              },
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: ElevatedButton(
                onPressed: () => _editController.editSkills(),
                child: const BodyText(text: 'Submit'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
