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
        title: const TitleText(text: 'Certificates'),
        actions: [
          IconButton(
            onPressed: () => Get.toNamed('/userAddCertificate'),
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          ),
        ],
        leading: _editController.generalController.isInRegister
            ? IconButton(
                onPressed: () => Get.offAllNamed('/viewPortfolios'),
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
        onRefresh: () => _editController.fetchCertificates(),
        child: GetBuilder<UserEditCertificatesController>(
          builder: (controller) => SingleChildScrollView(
            child: Column(
              children: [
                if (_editController.generalController.isInRegister)
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
                          trailing: Icon(
                            Icons.edit,
                            color: Colors.lightBlue.shade900,
                          ),
                          title: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(10),
                                child: Column(
                                  children: [
                                    Row(
                                      children: [
                                        const BodyText(text: 'Name: '),
                                        LabelText(
                                          text: controller
                                              .certificates[index].name,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Organization: '),
                                        LabelText(
                                          text: controller
                                              .certificates[index].organization,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        const BodyText(text: 'Date: '),
                                        LabelText(
                                          text: controller
                                              .certificates[index].date,
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              Row(
                                children: [
                                  IconButton(
                                    onPressed: () =>
                                        controller.generalController.fetchFile(
                                      controller.certificates[index].file,
                                      'certificate',
                                    ),
                                    icon: Icon(
                                      Icons.file_open,
                                      color: Colors.lightBlue.shade900,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () => Dialogs().confirmDialog(
                                      'Notice:',
                                      'Are you sure you want to delete Certificate?',
                                      () {
                                        controller.deleteCertificate(
                                          controller.certificates[index].id,
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
                            Form(
                              key: _editController.formField,
                              child: Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(10),
                                    child: CustomTextField(
                                      controller: controller.editNameController,
                                      textInputType: TextInputType.name,
                                      obsecureText: false,
                                      labelText: 'Name',
                                      icon: const Icon(Icons.abc),
                                      validator: (p0) => Validation()
                                          .validateRequiredField(p0),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(10),
                                    child: CustomTextField(
                                      controller:
                                          controller.editOrganizationController,
                                      textInputType: TextInputType.name,
                                      obsecureText: false,
                                      labelText: 'Organization',
                                      icon: const Icon(Icons.school),
                                      validator: (p0) => Validation()
                                          .validateRequiredField(p0),
                                    ),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const BodyText(
                                          text: 'Select release Date:'),
                                      Padding(
                                        padding: const EdgeInsets.all(10),
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
                                                text: "${controller.editDate}"
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
                                      builder: (controller) => ListContainer(
                                        child: BodyText(
                                          text: controller.editFileName == null
                                              ? 'File:${controller.certificates[index].file}'
                                              : 'File: ${controller.editFileName}',
                                        ),
                                      ),
                                    ),
                                  ),
                                  Row(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: OutlinedButton(
                                          child: const BodyText(
                                              text: 'Choose new file'),
                                          onPressed: () async =>
                                              controller.addFile(),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: ElevatedButton(
                                          child: const BodyText(text: 'Submit'),
                                          onPressed: () {
                                            if (controller
                                                    .formField.currentState
                                                    ?.validate() ==
                                                true) {
                                              controller.editCertificate(
                                                controller
                                                    .certificates[index].id,
                                                controller
                                                    .editNameController.text,
                                                controller
                                                    .editOrganizationController
                                                    .text,
                                                controller.editDate,
                                                controller
                                                    .certificates[index].file,
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
