import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/user/certificate/user_edit_certificates_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserEditCertificatesView extends StatelessWidget {
  final UserEditCertificatesController _editController =
      Get.put(UserEditCertificatesController());

  UserEditCertificatesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '31'.tr),
        actions: [
          if (!_editController.homeController.isOtherUserProfile)
            IconButton(
              onPressed: () => Get.toNamed('/userAddCertificate'),
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
            ),
        ],
        leading: _editController.settingsController.isInRegister
            ? IconButton(
                onPressed: () => Get.offAllNamed('/viewPortfolios'),
                icon: LabelText(text: '34'.tr),
              )
            : IconButton(
                onPressed: () => _editController.goBack(),
                icon: const Icon(Icons.arrow_back),
              ),
      ),
      body: RefreshIndicator(
        key: _editController.refreshIndicatorKey,
        onRefresh: () async {
          if (_editController.homeController.isOtherUserProfile) {
            await _editController.fetchCertificates(
              _editController.homeController.otherUserId,
              _editController.homeController.otherUserName,
            );
          } else {
            await _editController.fetchCertificates(
              _editController.homeController.user!.id,
              _editController.homeController.user!.name,
            );
          }
        },
        child: GetBuilder<UserEditCertificatesController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      if (_editController.settingsController.isInRegister)
                        const LinearProgressIndicator(
                          value: 0.75,
                        ),
                      ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.certificates.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(10),
                            child: Card(
                              child: ExpansionTile(
                                trailing:
                                    controller.homeController.isOtherUserProfile
                                        ? const Icon(null)
                                        : Icon(
                                            Icons.edit,
                                            color: Colors.lightBlue.shade900,
                                          ),
                                title: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              BodyText(text: '${'5'.tr}:'),
                                              LabelText(
                                                text: controller
                                                    .certificates[index].name,
                                              ),
                                            ],
                                          ),
                                          Row(
                                            children: [
                                              BodyText(text: '${'48'.tr}:'),
                                              LabelText(
                                                text: controller
                                                    .certificates[index]
                                                    .organization,
                                              ),
                                            ],
                                          ),
                                          Row(
                                            children: [
                                              BodyText(text: '${'80'.tr}:'),
                                              LabelText(
                                                  text:
                                                      '${controller.certificates[index].date.day}/${controller.certificates[index].date.month}/${controller.certificates[index].date.year}'),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Row(
                                      children: [
                                        IconButton(
                                          onPressed: () => controller
                                              .settingsController
                                              .fetchFile(
                                            controller.certificates[index].file,
                                            'certificate',
                                          ),
                                          icon: Icon(
                                            Icons.file_open,
                                            color: Colors.lightBlue.shade900,
                                          ),
                                        ),
                                        if (!_editController
                                            .homeController.isOtherUserProfile)
                                          IconButton(
                                            onPressed: () =>
                                                Dialogs().confirmDialog(
                                              '46'.tr,
                                              '50'.tr,
                                              () {
                                                controller.deleteCertificate(
                                                  controller
                                                      .certificates[index].id,
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
                                onExpansionChanged: (value) {
                                  if (value) {
                                    controller.startEdit(
                                      controller.certificates[index],
                                    );
                                  }
                                },
                                children: [
                                  if (!_editController
                                      .homeController.isOtherUserProfile)
                                    Form(
                                      key: _editController.formField,
                                      child: Column(
                                        children: [
                                          Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: CustomTextField(
                                              controller:
                                                  controller.editNameController,
                                              textInputType: TextInputType.name,
                                              obsecureText: false,
                                              labelText: '5'.tr,
                                              icon: Icons.abc,
                                              validator: (p0) => Validation()
                                                  .validateRequiredField(p0),
                                            ),
                                          ),
                                          Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: CustomTextField(
                                              controller: controller
                                                  .editOrganizationController,
                                              textInputType: TextInputType.name,
                                              obsecureText: false,
                                              labelText: '48'.tr,
                                              icon: Icons.school,
                                              validator: (p0) => Validation()
                                                  .validateRequiredField(p0),
                                            ),
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              BodyText(text: '51'.tr),
                                              Padding(
                                                padding:
                                                    const EdgeInsets.all(10),
                                                child: DateContainer(
                                                  widget: GetBuilder<
                                                      UserEditCertificatesController>(
                                                    builder: (controller) =>
                                                        GestureDetector(
                                                      onTap: () =>
                                                          controller.selectDate(
                                                        context,
                                                      ),
                                                      child: BodyText(
                                                        text:
                                                            "${controller.editDate}"
                                                                .split(' ')[0],
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                          Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: GetBuilder<
                                                UserEditCertificatesController>(
                                              builder: (controller) =>
                                                  InfoContainer(
                                                widget: BodyText(
                                                  text: controller
                                                              .editFileName ==
                                                          null
                                                      ? '${'File'.tr}:${controller.certificates[index].file}'
                                                      : '${'File'.tr}:${controller.editFileName}',
                                                ),
                                              ),
                                            ),
                                          ),
                                          Row(
                                            children: [
                                              Padding(
                                                padding:
                                                    const EdgeInsets.all(10),
                                                child: OutlinedButton(
                                                  child:
                                                      BodyText(text: '52'.tr),
                                                  onPressed: () async =>
                                                      controller.addFile(),
                                                ),
                                              ),
                                              Padding(
                                                padding:
                                                    const EdgeInsets.all(10),
                                                child: ElevatedButton(
                                                  child:
                                                      BodyText(text: '23'.tr),
                                                  onPressed: () {
                                                    if (controller.formField
                                                            .currentState
                                                            ?.validate() ==
                                                        true) {
                                                      controller
                                                          .editCertificate(
                                                        controller
                                                            .certificates[index]
                                                            .id,
                                                        controller
                                                            .editNameController
                                                            .text,
                                                        controller
                                                            .editOrganizationController
                                                            .text,
                                                        controller.editDate,
                                                        controller
                                                            .certificates[index]
                                                            .file,
                                                        controller.editfile,
                                                      );
                                                    }
                                                  },
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    )
                                ],
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
