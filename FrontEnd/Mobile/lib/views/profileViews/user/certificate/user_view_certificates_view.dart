import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_certificates_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserEditCertificatesView extends StatelessWidget {
  final UserEditCertificatesController _controller =
      Get.put(UserEditCertificatesController());

  UserEditCertificatesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'View Certificates'),
        actions: [
          IconButton(
            onPressed: () => Get.toNamed('/userAddCertificate'),
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
      body: RefreshIndicator(
        key: _controller.refreshIndicatorKey,
        onRefresh: () => _controller.fetchCertificates(),
        child: GetBuilder<UserEditCertificatesController>(
          builder: (controller) => ListView.builder(
            itemCount: controller.certificates.length,
            shrinkWrap: true,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.all(10),
                child: Card(
                  child: ExpansionTile(
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
                                    text: controller.certificates[index].name,
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
                                    text: controller.certificates[index].date,
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
                                controller.certificates[index].name,
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
                                'Are you sure you want to delete File?',
                                () {
                                  controller.deleteCertificate(
                                    controller.certificates[index].id,
                                  );
                                  Get.back();
                                },
                              ),
                              icon: const Icon(
                                Icons.cancel,
                                color: Colors.red,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    onExpansionChanged: (value) {
                      if (value) {
                        controller.startEdit(controller.certificates[index]);
                      }
                    },
                    children: [
                      Form(
                        key: _controller.formField1,
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
                                validator: (p0) =>
                                    Validation().validateRequiredField(p0),
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
                                validator: (p0) =>
                                    Validation().validateRequiredField(p0),
                              ),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const BodyText(text: 'Select release Date:'),
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: DateContainer(
                                    widget: GetBuilder<
                                        UserEditCertificatesController>(
                                      builder: (controller) => GestureDetector(
                                        onTap: () => controller.selectDate(
                                          context,
                                          controller.editDate,
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
                              child: GetBuilder<UserEditCertificatesController>(
                                builder: (controller) => ListContainer(
                                  child: BodyText(
                                      text: controller.editFileName == null
                                          ? 'File:${controller.certificates[index].file}'
                                          : 'File: ${controller.editFileName}'),
                                ),
                              ),
                            ),
                            Row(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: OutlinedButton(
                                    child:
                                        const BodyText(text: 'Choose new file'),
                                    onPressed: () async {
                                      controller.editfile = await controller
                                          .generalController
                                          .pickFile();
                                      if (controller.editfile != null) {
                                        controller.editFileName =
                                            controller.editfile!.files[0].name;
                                      }
                                      controller.update();
                                    },
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: ElevatedButton(
                                    child: const BodyText(text: 'Submit'),
                                    onPressed: () {
                                      if (controller.formField1.currentState
                                              ?.validate() ==
                                          true) {
                                        controller.editCertificate(
                                          controller.certificates[index].id,
                                          controller.editNameController.text,
                                          controller
                                              .editOrganizationController.text,
                                          controller.editDate,
                                          controller.certificates[index].file,
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
        ),
      ),
    );
  }
}
