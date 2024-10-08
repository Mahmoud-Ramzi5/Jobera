import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/portfolio/edit_portfolio_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class EditPortfolioView extends StatelessWidget {
  final EditPortfolioController _editController =
      Get.put(EditPortfolioController());
  EditPortfolioView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '61'.tr),
        actions: [
          TextButton(
            onPressed: () async {
              if (_editController.formField.currentState?.validate() == true) {
                _editController.editPortfolio(
                  _editController.portfolio.id,
                  _editController.editTitleController.text,
                  _editController.editDescriptionController.text,
                  _editController.editLinkController.text,
                  _editController.image,
                  _editController.usedSkills,
                );
              }
            },
            child: LabelText(text: '23'.tr),
          ),
        ],
      ),
      body: GetBuilder<EditPortfolioController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Form(
                key: _editController.formField,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            ProfilePhotoContainer(
                              height: 150,
                              width: 150,
                              child: controller.hasImage
                                  ? GestureDetector(
                                      onTap: () => Dialogs().addPhotoDialog(
                                        () => controller.takePhoto(),
                                        () => controller.addPhoto(),
                                        () => controller.removePhoto(),
                                      ),
                                      child: CustomImage(
                                        path: controller.portfolio.photo
                                            .toString(),
                                      ),
                                    )
                                  : GestureDetector(
                                      onTap: () => Dialogs().addPhotoDialog(
                                        () => controller.takePhoto(),
                                        () => controller.addPhoto(),
                                        () => controller.removePhoto(),
                                      ),
                                      child: controller.image == null
                                          ? Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: [
                                                Icon(
                                                  Icons.add_a_photo,
                                                  color:
                                                      Colors.lightBlue.shade900,
                                                ),
                                                BodyText(text: '62'.tr)
                                              ],
                                            )
                                          : Image.memory(
                                              controller.displayImage,
                                            ),
                                    ),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.editTitleController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '57'.tr,
                          icon: Icons.abc,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.editDescriptionController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '26'.tr,
                          icon: Icons.description,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: _editController.editLinkController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '56'.tr,
                          icon: Icons.link,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: InfoContainer(
                              name: '63'.tr,
                              widget: ListView.builder(
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount:
                                    (controller.usedSkills.length / 2).ceil(),
                                shrinkWrap: true,
                                itemBuilder: (context, index) {
                                  final firstIndex = index * 2;
                                  final secondIndex = firstIndex + 1;
                                  return Row(
                                    children: [
                                      if (firstIndex <
                                          controller.usedSkills.length)
                                        Expanded(
                                          flex: 1,
                                          child: Padding(
                                            padding: const EdgeInsets.all(5),
                                            child: InputChip(
                                              deleteIcon:
                                                  const Icon(Icons.cancel),
                                              onDeleted: () {
                                                controller.deleteSkill(
                                                  controller
                                                      .usedSkills[firstIndex],
                                                );
                                              },
                                              label: BodyText(
                                                text: controller
                                                    .usedSkills[firstIndex]
                                                    .name,
                                              ),
                                            ),
                                          ),
                                        ),
                                      if (secondIndex <
                                          controller.usedSkills.length)
                                        Expanded(
                                          flex: 1,
                                          child: Padding(
                                            padding: const EdgeInsets.all(5),
                                            child: InputChip(
                                              deleteIcon:
                                                  const Icon(Icons.cancel),
                                              onDeleted: () {
                                                controller.deleteSkill(
                                                  controller
                                                      .usedSkills[secondIndex],
                                                );
                                              },
                                              label: BodyText(
                                                text: controller
                                                    .usedSkills[secondIndex]
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
                              name: '30'.tr,
                              widget: ExpansionTile(
                                title: BodyText(text: '64'.tr),
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(10),
                                    child: SearchBar(
                                      hintText: '36'.tr,
                                      leading: Icon(
                                        Icons.search,
                                        color: Colors.lightBlue.shade900,
                                      ),
                                      onChanged: (value) =>
                                          controller.searchSkills(value),
                                    ),
                                  ),
                                  ListView.builder(
                                    physics:
                                        const NeverScrollableScrollPhysics(),
                                    itemCount:
                                        (controller.skills.length / 2).ceil(),
                                    shrinkWrap: true,
                                    itemBuilder: (context, index) {
                                      final firstIndex = index * 2;
                                      final secondIndex = firstIndex + 1;
                                      return Row(
                                        children: [
                                          if (firstIndex <
                                              controller.skills.length)
                                            Expanded(
                                              flex: 1,
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(5),
                                                child: InputChip(
                                                  label: BodyText(
                                                    text: controller
                                                        .skills[firstIndex]
                                                        .name,
                                                  ),
                                                  onPressed: () {
                                                    controller.addToOMySkills(
                                                      controller
                                                          .skills[firstIndex],
                                                    );
                                                  },
                                                ),
                                              ),
                                            ),
                                          if (secondIndex <
                                              controller.skills.length)
                                            Expanded(
                                              flex: 1,
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(5),
                                                child: InputChip(
                                                  label: BodyText(
                                                    text: controller
                                                        .skills[secondIndex]
                                                        .name,
                                                  ),
                                                  onPressed: () {
                                                    controller.addToOMySkills(
                                                      controller
                                                          .skills[secondIndex],
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
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: GetBuilder<EditPortfolioController>(
                          builder: (controller) => InfoContainer(
                            widget: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                BodyText(text: '65'.tr),
                                ListView.builder(
                                  itemCount: controller.files.length,
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemBuilder: (context, index) {
                                    return Row(
                                      children: [
                                        Flexible(
                                          flex: 1,
                                          child: BodyText(
                                            text:
                                                '${'45'.tr} ${index + 1}: ${controller.files[index].name} ',
                                          ),
                                        ),
                                        IconButton(
                                          onPressed: () =>
                                              controller.removeFile(index),
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
                          child: BodyText(text: '66'.tr),
                          onPressed: () async => _editController.addFiles(),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
