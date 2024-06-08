import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/portfolio/edit_portfolio_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class ViewPortfoliosView extends StatelessWidget {
  final EditPortfolioController _editController =
      Get.put(EditPortfolioController());

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
        leading: _editController.generalController.isInRegister
            ? IconButton(
                onPressed: () {
                  _editController.generalController.isInRegister = false;
                  Get.offAllNamed('/home');
                },
                icon: const LabelText(
                  text: 'Next',
                ),
              )
            : null,
      ),
      body: RefreshIndicator(
        key: _editController.refreshIndicatorKey,
        onRefresh: () => _editController.fetchPortfolios(),
        child: GetBuilder<EditPortfolioController>(
          builder: (controller) => SingleChildScrollView(
            child: Column(
              children: [
                if (_editController.generalController.isInRegister)
                  const LinearProgressIndicator(
                    value: 1,
                  ),
                ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: controller.portoflios.length,
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
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  ProfilePhotoContainer(
                                    child: controller
                                                .portoflios[index1].photo ==
                                            null
                                        ? Icon(
                                            Icons.photo,
                                            color: Colors.lightBlue.shade900,
                                            size: 100,
                                          )
                                        : CustomImage(
                                            height: 100,
                                            width: 100,
                                            path: controller
                                                .portoflios[index1].photo
                                                .toString(),
                                          ),
                                  ),
                                  Column(
                                    children: [
                                      IconButton(
                                        onPressed: () {
                                          controller.startEdit(
                                              controller.portoflios[index1].id);
                                          Get.toNamed('/editPortfolio');
                                        },
                                        icon: Icon(
                                          Icons.edit,
                                          color: Colors.lightBlue.shade900,
                                        ),
                                      ),
                                      IconButton(
                                        onPressed: () =>
                                            Dialogs().confirmDialog(
                                          'Notice:',
                                          'Are you sure you want to delete Portofolio?',
                                          () {
                                            controller.deletePortfolio(
                                              controller.portoflios[index1].id,
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
                                              .portoflios[index1].title,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Description: '),
                                        Flexible(
                                          flex: 1,
                                          child: LabelText(
                                            text: controller
                                                .portoflios[index1].description,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Link: '),
                                        LabelText(
                                          text: controller
                                              .portoflios[index1].link,
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
                                              .portoflios[index1].skills.length,
                                          shrinkWrap: true,
                                          itemBuilder: (context, index) {
                                            final firstIndex = index * 2;
                                            final secondIndex = firstIndex + 1;
                                            return Row(
                                              children: [
                                                if (firstIndex <
                                                    controller
                                                        .portoflios[index1]
                                                        .skills
                                                        .length)
                                                  Expanded(
                                                    flex: 1,
                                                    child: Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              5),
                                                      child: Chip(
                                                        label: BodyText(
                                                          text: controller
                                                              .portoflios[
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
                                                        .portoflios[index1]
                                                        .skills
                                                        .length)
                                                  Expanded(
                                                    flex: 1,
                                                    child: Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              5),
                                                      child: Chip(
                                                        label: BodyText(
                                                          text: controller
                                                              .portoflios[
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
                                    child: ListContainer(
                                      child: Padding(
                                        padding: const EdgeInsets.all(5),
                                        child: controller.portoflios[index1]
                                                .files!.isEmpty
                                            ? const BodyText(
                                                text: 'No files',
                                              )
                                            : ListView.builder(
                                                itemCount: controller
                                                    .portoflios[index1]
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
                                                              'File ${index + 1}:${controller.portoflios[index1].files![index].name}',
                                                        ),
                                                      ),
                                                      IconButton(
                                                        onPressed: () => controller
                                                            .generalController
                                                            .fetchFile(
                                                                controller
                                                                    .portoflios[
                                                                        index1]
                                                                    .files![
                                                                        index]
                                                                    .path,
                                                                'portfolios'),
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
