import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_certificates_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserAddCertificateView extends StatelessWidget {
  final UserEditCertificatesController _addController =
      Get.find<UserEditCertificatesController>();
  UserAddCertificateView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Add Certificate'),
        actions: [
          TextButton(
            onPressed: () {
              if (_addController.formField.currentState?.validate() == true) {
                _addController.addCertificate(
                  _addController.newNameController.text,
                  _addController.newOrganizationController.text,
                  _addController.newDate,
                  _addController.file,
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
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.newNameController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Name',
                  icon: const Icon(Icons.abc),
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.newOrganizationController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Organization',
                  icon: const Icon(Icons.school),
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const BodyText(text: 'Select release Date:'),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: DateContainer(
                      widget: GetBuilder<UserEditCertificatesController>(
                        builder: (controller) => GestureDetector(
                          onTap: () => controller.selectDate(
                            context,
                            controller.newDate,
                          ),
                          child: BodyText(
                            text: "${controller.newDate}".split(' ')[0],
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
                        text: _addController.newFileName == null
                            ? 'File:'
                            : 'File: ${_addController.newFileName}'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: OutlinedButton(
                  child: const BodyText(text: 'Choose new file'),
                  onPressed: () async {
                    _addController.file =
                        await _addController.generalController.pickFile();
                    if (_addController.file != null) {
                      _addController.newFileName =
                          _addController.file!.files[0].name;
                    }
                    _addController.update();
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
