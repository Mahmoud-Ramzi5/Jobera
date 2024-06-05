import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/user/portofolio/user_edit_portofolio_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class UserViewPortofoliosView extends StatelessWidget {
  final UserEditPortofolioController _editController =
      Get.put(UserEditPortofolioController());

  UserViewPortofoliosView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: const TitleText(text: 'Portofolios'),
          actions: [
            IconButton(
              onPressed: () => Get.toNamed('/userAddPortofolio'),
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
            )
          ],
          leading: _editController.generalController.isInRegister
              ? IconButton(
                  onPressed: () {
                    Get.offAllNamed('/home');
                    _editController.generalController.isInRegister = false;
                  },
                  icon: const LabelText(text: 'Skip'),
                )
              : null),
      body: RefreshIndicator(
        key: _editController.refreshIndicatorKey,
        onRefresh: () => _editController.fetchPortofolios(),
        child: GetBuilder<UserEditPortofolioController>(
          builder: (controller) => Column(
            children: [
              if (_editController.generalController.isInRegister)
                const LinearProgressIndicator(
                  value: 1,
                ),
              ListView.builder(
                itemCount: controller.portofolios.length,
                shrinkWrap: true,
                itemBuilder: (context, index1) {
                  return Padding(
                    padding: const EdgeInsets.all(10),
                    child: Card(
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                ProfilePhotoContainer(
                                  child: controller.portofolios[index1].photo ==
                                          null
                                      ? Icon(
                                          Icons.photo,
                                          color: Colors.lightBlue.shade900,
                                        )
                                      : CustomImage(
                                          height: 100,
                                          width: 100,
                                          path: controller
                                              .portofolios[index1].photo
                                              .toString()),
                                ),
                                Column(
                                  children: [
                                    IconButton(
                                      onPressed: () {},
                                      icon: Icon(
                                        Icons.edit,
                                        color: Colors.lightBlue.shade900,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () => Dialogs().confirmDialog(
                                        'Notice:',
                                        'Are you sure you want to delete Portofolio?',
                                        () {
                                          controller.deletePortofolio(
                                            controller.portofolios[index1].id,
                                          );
                                          Get.back();
                                        },
                                      ),
                                      icon: const Icon(
                                        Icons.delete,
                                        color: Colors.red,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      const BodyText(text: 'Title: '),
                                      LabelText(
                                        text: _editController
                                            .portofolios[index1].title,
                                      ),
                                    ],
                                  ),
                                  Row(
                                    children: [
                                      const BodyText(text: 'Description: '),
                                      LabelText(
                                        text: controller
                                            .portofolios[index1].description,
                                      ),
                                    ],
                                  ),
                                  Row(
                                    children: [
                                      const BodyText(text: 'Link: '),
                                      LabelText(
                                        text:
                                            controller.portofolios[index1].link,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            ExpansionTile(
                              title: const BodyText(text: 'Used Skills'),
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: ListContainer(
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: ListView.builder(
                                        itemCount: controller
                                            .portofolios[index1].skills.length,
                                        shrinkWrap: true,
                                        itemBuilder: (context, index) {
                                          final firstIndex = index * 2;
                                          final secondIndex = firstIndex + 1;
                                          return Row(
                                            children: [
                                              if (firstIndex <
                                                  controller.portofolios[index1]
                                                      .skills.length)
                                                Expanded(
                                                  flex: 1,
                                                  child: Padding(
                                                    padding:
                                                        const EdgeInsets.all(5),
                                                    child: Chip(
                                                      label: BodyText(
                                                        text: controller
                                                            .portofolios[index1]
                                                            .skills[firstIndex]
                                                            .name,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              if (secondIndex <
                                                  controller.portofolios[index1]
                                                      .skills.length)
                                                Expanded(
                                                  flex: 1,
                                                  child: Padding(
                                                    padding:
                                                        const EdgeInsets.all(5),
                                                    child: Chip(
                                                      label: BodyText(
                                                        text: controller
                                                            .portofolios[index1]
                                                            .skills[secondIndex]
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
                                ),
                              ],
                            ),
                            ExpansionTile(
                              title: const BodyText(text: 'Files'),
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: ListContainer(
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: controller.portofolios[index1]
                                              .files!.isEmpty
                                          ? const BodyText(
                                              text: 'No files',
                                            )
                                          : ListView.builder(
                                              itemCount: controller
                                                  .portofolios[index1]
                                                  .files!
                                                  .length,
                                              physics:
                                                  const NeverScrollableScrollPhysics(),
                                              shrinkWrap: true,
                                              itemBuilder: (context, index) {
                                                return Row(
                                                  children: [
                                                    Flexible(
                                                      flex: 1,
                                                      child: BodyText(
                                                        text:
                                                            'File ${index + 1}:${controller.portofolios[index1].files![index].name}',
                                                      ),
                                                    ),
                                                    IconButton(
                                                      onPressed: () => controller
                                                          .generalController
                                                          .fetchFile(
                                                              controller
                                                                  .portofolios[
                                                                      index1]
                                                                  .files![index]
                                                                  .path,
                                                              'portofolios'),
                                                      icon: Icon(
                                                        Icons.file_open,
                                                        color: Colors
                                                            .lightBlue.shade900,
                                                      ),
                                                    ),
                                                  ],
                                                );
                                              },
                                            ),
                                    ),
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
