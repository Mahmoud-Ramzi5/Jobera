import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_certificates_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserAddCertificateView extends StatelessWidget {
  final UserEditCertificatesController _editController =
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
              if (_editController.formField.currentState?.validate() == true) {
                _editController.addCertificate(
                  _editController.newNameController.text,
                  _editController.newOrganizationController.text,
                  '${_editController.newDate.day}-${_editController.newDate.month}-${_editController.newDate.year}',
                  _editController.file,
                );
              }
            },
            child: const LabelText(text: "Submit"),
          ),
        ],
      ),
      body: Form(
        key: _editController.formField,
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _editController.newNameController,
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
                  controller: _editController.newOrganizationController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'Organization',
                  icon: const Icon(Icons.school),
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              const BodyText(text: 'Select release Date:'),
              Padding(
                padding: const EdgeInsets.all(10),
                child: DateContainer(
                  widget: GetBuilder<UserEditCertificatesController>(
                    builder: (controller) => GestureDetector(
                      onTap: () => controller.selectDate(context),
                      child: BodyText(
                        text: "${controller.newDate}".split(' ')[0],
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: GetBuilder<UserEditCertificatesController>(
                  builder: (controller) => ListContainer(
                    child: BodyText(
                        text: _editController.newFileName == null
                            ? 'File:'
                            : 'File: ${_editController.newFileName}'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: OutlinedButton(
                  child: const BodyText(text: 'Choose new file'),
                  onPressed: () async {
                    _editController.file =
                        await _editController.generalController.pickFile();
                    if (_editController.file != null) {
                      _editController.newFileName =
                          _editController.file!.files[0].name;
                    }
                    _editController.update();
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
