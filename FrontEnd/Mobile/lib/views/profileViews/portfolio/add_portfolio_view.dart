import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/portfolio/add_portfolio_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class AddPortfolioView extends StatelessWidget {
  final AddPortfolioController _addController =
      Get.put(AddPortfolioController());

  AddPortfolioView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Add Portfolio'),
        actions: [
          TextButton(
            onPressed: () {
              if (_addController.formField.currentState?.validate() == true) {
                _addController.addPortfolio(
                  _addController.titleController.text,
                  _addController.descriptionController.text,
                  _addController.linkController.text,
                  _addController.image,
                  _addController.selectedSkills,
                  _addController.files,
                );
              }
            },
            child: const LabelText(text: "Submit"),
          ),
        ],
      ),
      body: Form(
        key: _addController.formField,
        child: SingleChildScrollView(
          child: Column(
            children: [
              GetBuilder<AddPortfolioController>(
                builder: (controller) => Padding(
                  padding: const EdgeInsets.all(10),
                  child: ProfilePhotoContainer(
                    height: 150,
                    width: 150,
                    child: controller.image == null
                        ? GestureDetector(
                            onTap: () => Dialogs().addPhotoDialog(
                              () => controller.takePhoto(),
                              () => controller.addPhoto(),
                              () => controller.removePhoto(),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.add_a_photo,
                                  color: Colors.lightBlue.shade900,
                                ),
                                const BodyText(text: 'Add a photo')
                              ],
                            ),
                          )
                        : GestureDetector(
                            child: Image.memory(controller.displayImage),
                            onTap: () => Dialogs().addPhotoDialog(
                              () => controller.takePhoto(),
                              () => controller.addPhoto(),
                              () => controller.removePhoto(),
                            ),
                          ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.titleController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Title',
                  icon: Icons.abc,
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.descriptionController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Description',
                  icon: Icons.description,
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.linkController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Link',
                  icon: Icons.link,
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              GetBuilder<AddPortfolioController>(
                builder: (controller) => Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoContainer(
                        name: 'Used Skills Max=5',
                        widget: ListView.builder(
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount:
                              (controller.selectedSkills.length / 2).ceil(),
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            final firstIndex = index * 2;
                            final secondIndex = firstIndex + 1;
                            return Row(
                              children: [
                                if (firstIndex <
                                    controller.selectedSkills.length)
                                  Expanded(
                                    flex: 1,
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: InputChip(
                                        deleteIcon: const Icon(Icons.cancel),
                                        onDeleted: () {
                                          controller.deleteSkill(controller
                                              .selectedSkills[firstIndex]);
                                        },
                                        label: BodyText(
                                          text: controller
                                              .selectedSkills[firstIndex].name,
                                        ),
                                      ),
                                    ),
                                  ),
                                if (secondIndex <
                                    controller.selectedSkills.length)
                                  Expanded(
                                    flex: 1,
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: InputChip(
                                        deleteIcon: const Icon(Icons.cancel),
                                        onDeleted: () {
                                          controller.deleteSkill(controller
                                              .selectedSkills[secondIndex]);
                                        },
                                        label: BodyText(
                                          text: controller
                                              .selectedSkills[secondIndex].name,
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
                        name: 'Skills',
                        widget: ExpansionTile(
                          title: const BodyText(text: 'Expand'),
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: SearchBar(
                                hintText: 'Search',
                                leading: Icon(
                                  Icons.search,
                                  color: Colors.lightBlue.shade900,
                                ),
                                onChanged: (value) =>
                                    controller.searchSkills(value),
                              ),
                            ),
                            ListView.builder(
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
                                              text: controller
                                                  .skills[firstIndex].name,
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
                                              text: controller
                                                  .skills[secondIndex].name,
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
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: GetBuilder<AddPortfolioController>(
                  builder: (controller) => InfoContainer(
                    widget: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const BodyText(text: 'Select files Max=5 files'),
                        ListView.builder(
                          itemCount: controller.files == null
                              ? 0
                              : controller.files!.count,
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) {
                            return Row(
                              children: [
                                Flexible(
                                  flex: 1,
                                  child: BodyText(
                                    text:
                                        'File ${index + 1}:${controller.files!.files[index].name}',
                                  ),
                                ),
                                IconButton(
                                  onPressed: () => _addController.removeFile(
                                      controller.files!.files[index]),
                                  icon: const Icon(
                                    Icons.cancel,
                                    color: Colors.red,
                                  ),
                                )
                              ],
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: OutlinedButton(
                  child: const BodyText(text: 'Choose files'),
                  onPressed: () async => _addController.addFiles(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
