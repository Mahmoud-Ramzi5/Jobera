import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_education_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class UserEditEducationView extends StatelessWidget {
  final UserEditEducationController _editController =
      Get.put(UserEditEducationController());

  UserEditEducationView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '29'.tr),
        actions: [
          TextButton(
            onPressed: () async {
              if (_editController.formField.currentState?.validate() == true) {
                await _editController.editEducation(
                  _editController.selectedLevel.toString(),
                  _editController.editFieldController.text,
                  _editController.editSchoolController.text,
                  _editController.startDate,
                  _editController.endDate,
                  _editController.file,
                );
              }
            },
            child: _editController.settingsController.isInRegister
                ? LabelText(text: '34'.tr)
                : LabelText(text: '23'.tr),
          )
        ],
      ),
      body: GetBuilder<UserEditEducationController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Form(
                key: _editController.formField,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      if (controller.settingsController.isInRegister)
                        const LinearProgressIndicator(
                          value: 0.5,
                        ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Center(
                          child: CustomDropDownButton(
                            value: controller.selectedLevel,
                            items: controller.levels.entries.map((entry) {
                              return DropdownMenuItem<String>(
                                value: entry.value,
                                child: BodyText(
                                  text: entry.key,
                                ),
                              );
                            }).toList(),
                            onChanged: (p0) =>
                                controller.selectLevel(p0.toString()),
                            text: '39'.tr,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.editFieldController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '40'.tr,
                          icon: Icons.school,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.editSchoolController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: '41'.tr,
                          icon: Icons.account_balance,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          BodyText(text: '42'.tr),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: DateContainer(
                              widget: GestureDetector(
                                onTap: () => controller.selectDate(
                                  context,
                                  controller.startDate,
                                ),
                                child: BodyText(
                                  text: "${controller.startDate}".split(' ')[0],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          BodyText(text: '43'.tr),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: DateContainer(
                              widget: GestureDetector(
                                onTap: () => controller.selectDate(
                                  context,
                                  controller.endDate,
                                ),
                                child: BodyText(
                                  text: "${controller.endDate}".split(' ')[0],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          widget: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Flexible(
                                flex: 1,
                                child: BodyText(
                                  text: _editController.certficateName == null
                                      ? '44'.tr
                                      : '${'45'.tr}: ${_editController.certficateName}',
                                ),
                              ),
                              if (_editController.certficateName != null)
                                IconButton(
                                  onPressed: () {
                                    Dialogs().confirmDialog(
                                      '46'.tr,
                                      '47'.tr,
                                      () {
                                        _editController.removeFile();
                                      },
                                    );
                                  },
                                  icon: const Icon(
                                    Icons.cancel,
                                    color: Colors.red,
                                  ),
                                )
                              else
                                IconButton(
                                  onPressed: () async =>
                                      _editController.addFile(),
                                  icon: Icon(
                                    Icons.add,
                                    color: Colors.lightBlue.shade900,
                                  ),
                                ),
                            ],
                          ),
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
