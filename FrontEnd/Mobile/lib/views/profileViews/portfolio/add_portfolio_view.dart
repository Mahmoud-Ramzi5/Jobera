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
        title: TitleText(text: '67'.tr),
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
            child: LabelText(text: '23'.tr),
          ),
        ],
      ),
      body: GetBuilder<AddPortfolioController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Form(
                key: controller.formField,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
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
                                      BodyText(text: '62'.tr)
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
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: _addController.titleController,
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
                          controller: _addController.descriptionController,
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
                          controller: _addController.linkController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '56'.tr,
                          icon: Icons.link,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      GetBuilder<AddPortfolioController>(
                        builder: (controller) => Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoContainer(
                                name: '63'.tr,
                                widget: ListView.builder(
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount:
                                      (controller.selectedSkills.length / 2)
                                          .ceil(),
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
                                                deleteIcon:
                                                    const Icon(Icons.cancel),
                                                onDeleted: () {
                                                  controller.deleteSkill(
                                                      controller.selectedSkills[
                                                          firstIndex]);
                                                },
                                                label: BodyText(
                                                  text: controller
                                                      .selectedSkills[
                                                          firstIndex]
                                                      .name,
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
                                                deleteIcon:
                                                    const Icon(Icons.cancel),
                                                onDeleted: () {
                                                  controller.deleteSkill(
                                                      controller.selectedSkills[
                                                          secondIndex]);
                                                },
                                                label: BodyText(
                                                  text: controller
                                                      .selectedSkills[
                                                          secondIndex]
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
                                                        controller.skills[
                                                            secondIndex],
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
                                BodyText(text: '65'.tr),
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
                                                '${'45'.tr} ${index + 1}:${controller.files!.files[index].name}',
                                          ),
                                        ),
                                        IconButton(
                                          onPressed: () => _addController
                                              .removeFile(controller
                                                  .files!.files[index]),
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
                          onPressed: () async => _addController.addFiles(),
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
