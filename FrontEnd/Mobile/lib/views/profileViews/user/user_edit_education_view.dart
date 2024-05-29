import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
        title: const TitleText(text: 'Edit Education'),
        actions: [
          TextButton(
            onPressed: () {
              if (_editController.formField.currentState?.validate() == true) {}
            },
            child: const LabelText(text: 'Submit'),
          )
        ],
      ),
      body: Form(
        key: _editController.formField,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: GetBuilder<UserEditEducationController>(
                builder: (controller) => Center(
                  child: CustomDropDownButton(
                    value: controller.selectedLevel,
                    items: controller.levels
                        .map<DropdownMenuItem<String>>(
                          (level) => DropdownMenuItem<String>(
                            value: level.toUpperCase(),
                            child: BodyText(text: level),
                          ),
                        )
                        .toList(),
                    onChanged: (p0) => controller.selectLevel(p0.toString()),
                    text: 'Level',
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: _editController.editFieldController,
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
                controller: _editController.editSchoolController,
                textInputType: TextInputType.phone,
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
                    widget: GetBuilder<UserEditEducationController>(
                      builder: (controller) => GestureDetector(
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
                    widget: GetBuilder<UserEditEducationController>(
                      builder: (controller) => GestureDetector(
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
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: InfoWithEditContainer(
                name: 'Certificate',
                buttonText: 'Edit',
                icon: Icons.edit,
                widget: const Column(),
                onPressed: () {},
              ),
            ),
          ],
        ),
      ),
    );
  }
}
