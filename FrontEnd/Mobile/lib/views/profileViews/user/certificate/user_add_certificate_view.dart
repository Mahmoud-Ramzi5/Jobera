import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/user/certificate/user_add_certificate_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserAddCertificateView extends StatelessWidget {
  final UserAddCertificateController _addController =
      Get.put(UserAddCertificateController());
  UserAddCertificateView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '53'.tr),
        actions: [
          TextButton(
            onPressed: () {
              if (_addController.formField.currentState?.validate() == true) {
                _addController.addCertificate(
                  _addController.nameController.text,
                  _addController.organizationController.text,
                  _addController.date,
                  _addController.file,
                );
              }
            },
            child: LabelText(text: '23'.tr),
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
                  controller: _addController.nameController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: '5'.tr,
                  icon: Icons.abc,
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomTextField(
                  controller: _addController.organizationController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: '48'.tr,
                  icon: Icons.school,
                  validator: (p0) => Validation().validateRequiredField(p0),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  BodyText(text: '51'.tr),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: DateContainer(
                      widget: GetBuilder<UserAddCertificateController>(
                        builder: (controller) => GestureDetector(
                          onTap: () => controller.selectDate(
                            context,
                          ),
                          child: BodyText(
                            text: "${controller.date}".split(' ')[0],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: GetBuilder<UserAddCertificateController>(
                  builder: (controller) => InfoContainer(
                    widget: BodyText(
                      text: controller.fileName == null
                          ? '${'45'.tr}:'
                          : '${'45'.tr}:${controller.fileName}',
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: OutlinedButton(
                  child: BodyText(text: '54'.tr),
                  onPressed: () async => _addController.addFile(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
