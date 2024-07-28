import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/profileControllers/portfolio/view_portfolio_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class ViewPortfoliosView extends StatelessWidget {
  final ViewPortfolioController _editController =
      Get.put(ViewPortfolioController());

  ViewPortfoliosView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Portfolios'),
        actions: [
          IconButton(
            onPressed: () => Get.toNamed('/addPortfolio'),
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
        leading: _editController.settingsController.isInRegister
            ? IconButton(
                onPressed: () => _editController.finishRegister(),
                icon: const LabelText(
                  text: 'Next',
                ),
              )
            : IconButton(
                onPressed: () => _editController.goBack(),
                icon: const Icon(Icons.arrow_back),
              ),
      ),
      body: RefreshIndicator(
        key: _editController.refreshIndicatorKey,
        onRefresh: () => _editController.fetchPortfolios(),
        child: GetBuilder<ViewPortfolioController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      if (_editController.settingsController.isInRegister)
                        const LinearProgressIndicator(
                          value: 1,
                        ),
                      ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.portfolios.length,
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
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        IconButton(
                                          onPressed: () {
                                            controller.id = controller
                                                .portfolios[index1].id;
                                            Get.toNamed('/editPortfolio');
                                          },
                                          icon: Icon(
                                            Icons.edit,
                                            color: Colors.lightBlue.shade900,
                                          ),
                                        ),
                                        ProfilePhotoContainer(
                                          height: 100,
                                          width: 100,
                                          child: controller.portfolios[index1]
                                                      .photo ==
                                                  null
                                              ? Icon(
                                                  Icons.photo,
                                                  color:
                                                      Colors.lightBlue.shade900,
                                                  size: 50,
                                                )
                                              : CustomImage(
                                                  path: controller
                                                      .portfolios[index1].photo
                                                      .toString(),
                                                ),
                                        ),
                                        IconButton(
                                          onPressed: () =>
                                              Dialogs().confirmDialog(
                                            'Notice:',
                                            'Are you sure you want to delete Portfolio?',
                                            () {
                                              controller.deletePortfolio(
                                                controller
                                                    .portfolios[index1].id,
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
                                    ExpansionTile(
                                      title: const BodyText(text: 'Info'),
                                      children: [
                                        Column(
                                          children: [
                                            Row(
                                              children: [
                                                const BodyText(text: 'Title: '),
                                                LabelText(
                                                  text: _editController
                                                      .portfolios[index1].title,
                                                ),
                                              ],
                                            ),
                                            Row(
                                              children: [
                                                const BodyText(text: 'Link: '),
                                                LabelText(
                                                  text: controller
                                                      .portfolios[index1].link,
                                                ),
                                              ],
                                            ),
                                            Row(
                                              children: [
                                                const BodyText(
                                                    text: 'Description: '),
                                                Flexible(
                                                  flex: 1,
                                                  child: LabelText(
                                                    text: controller
                                                        .portfolios[index1]
                                                        .description,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    ExpansionTile(
                                      title:
                                          const BodyText(text: 'Used Skills'),
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: InfoContainer(
                                            widget: Padding(
                                              padding: const EdgeInsets.all(5),
                                              child: ListView.builder(
                                                itemCount: controller
                                                    .portfolios[index1]
                                                    .skills
                                                    .length,
                                                shrinkWrap: true,
                                                itemBuilder: (context, index) {
                                                  final firstIndex = index * 2;
                                                  final secondIndex =
                                                      firstIndex + 1;
                                                  return Row(
                                                    children: [
                                                      if (firstIndex <
                                                          controller
                                                              .portfolios[
                                                                  index1]
                                                              .skills
                                                              .length)
                                                        Expanded(
                                                          flex: 1,
                                                          child: Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                    .all(5),
                                                            child: Chip(
                                                              label: BodyText(
                                                                text: controller
                                                                    .portfolios[
                                                                        index1]
                                                                    .skills[
                                                                        firstIndex]
                                                                    .name,
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      if (secondIndex <
                                                          controller
                                                              .portfolios[
                                                                  index1]
                                                              .skills
                                                              .length)
                                                        Expanded(
                                                          flex: 1,
                                                          child: Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                    .all(5),
                                                            child: Chip(
                                                              label: BodyText(
                                                                text: controller
                                                                    .portfolios[
                                                                        index1]
                                                                    .skills[
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
                                        ),
                                      ],
                                    ),
                                    ExpansionTile(
                                      title: const BodyText(text: 'Files'),
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: InfoContainer(
                                            widget: Padding(
                                              padding: const EdgeInsets.all(5),
                                              child: controller
                                                      .portfolios[index1]
                                                      .files
                                                      .isEmpty
                                                  ? const BodyText(
                                                      text: 'No files',
                                                    )
                                                  : ListView.builder(
                                                      itemCount: controller
                                                          .portfolios[index1]
                                                          .files
                                                          .length,
                                                      physics:
                                                          const NeverScrollableScrollPhysics(),
                                                      shrinkWrap: true,
                                                      itemBuilder:
                                                          (context, index) {
                                                        return Row(
                                                          children: [
                                                            Flexible(
                                                              flex: 1,
                                                              child: BodyText(
                                                                text:
                                                                    'File ${index + 1}:${controller.portfolios[index1].files[index].name}',
                                                              ),
                                                            ),
                                                            IconButton(
                                                              onPressed: () =>
                                                                  controller
                                                                      .settingsController
                                                                      .fetchFile(
                                                                controller
                                                                    .portfolios[
                                                                        index1]
                                                                    .files[
                                                                        index]
                                                                    .path,
                                                                'portfolios',
                                                              ),
                                                              icon: Icon(
                                                                Icons.file_open,
                                                                color: Colors
                                                                    .lightBlue
                                                                    .shade900,
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
      ),
    );
  }
}
