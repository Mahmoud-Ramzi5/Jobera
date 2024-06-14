import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/classes/validation.dart';
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
        title: const TitleText(text: 'Education'),
        actions: [
          _editController.generalController.isInRegister
              ? TextButton(
                  onPressed: () async {
                    if (_editController.formField.currentState?.validate() ==
                        true) {
                      _editController.advanceRegisterStep();
                    }
                  },
                  child: const LabelText(text: 'Next'),
                )
              : TextButton(
                  onPressed: () async {
                    if (_editController.formField.currentState?.validate() ==
                        true) {
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
                  child: const LabelText(text: 'Submit'),
                )
        ],
      ),
      body: Form(
        key: _editController.formField,
        child: SingleChildScrollView(
          child: GetBuilder<UserEditEducationController>(
            builder: (controller) => Column(
              children: [
                if (controller.generalController.isInRegister)
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
                      onChanged: (p0) => controller.selectLevel(p0.toString()),
                      text: 'Level',
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: CustomTextField(
                    controller: controller.editFieldController,
                    textInputType: TextInputType.name,
                    obsecureText: false,
                    labelText: 'Field',
                    icon: const Icon(Icons.school),
                    validator: (p0) => Validation().validateRequiredField(p0),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: CustomTextField(
                    controller: controller.editSchoolController,
                    textInputType: TextInputType.name,
                    obsecureText: false,
                    labelText: 'School',
                    icon: const Icon(Icons.account_balance),
                    validator: (p0) => Validation().validateRequiredField(p0),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const BodyText(text: 'Start Date:'),
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
                    const BodyText(text: 'End Date:'),
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
                  child: ListContainer(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Flexible(
                          flex: 1,
                          child: BodyText(
                            text: _editController.certficateName == null
                                ? 'Add file'
                                : 'File: ${_editController.certficateName}',
                          ),
                        ),
                        if (_editController.certficateName != null)
                          IconButton(
                            onPressed: () {
                              Dialogs().confirmDialog(
                                'Notice:',
                                'Are you sure you want to delete File?',
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
                            onPressed: () async => _editController.addFile(),
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
