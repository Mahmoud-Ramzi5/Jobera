import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_info_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class UserEditInfoView extends StatelessWidget {
  final UserEditInfoController _editController =
      Get.put(UserEditInfoController());

  UserEditInfoView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Edit Info'),
        actions: [
          TextButton(
            onPressed: () {
              if (_editController.formField.currentState?.validate() == true) {
                _editController.editBasicInfo(
                  _editController.editNameController.text,
                  _editController.editPhoneNumberController.text,
                  _editController.selectedState!.stateId,
                );
              }
            },
            child: const LabelText(text: 'Submit'),
          ),
        ],
      ),
      body: GetBuilder<UserEditInfoController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Form(
                key: controller.formField,
                child: SingleChildScrollView(
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
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            CodePicker(
                              onChange: (p0) =>
                                  controller.selectCountryCode(p0),
                            ),
                            SizedBox(
                              width: 200,
                              child: CustomTextField(
                                controller:
                                    controller.editPhoneNumberController,
                                textInputType: TextInputType.phone,
                                obsecureText: false,
                                labelText: 'Phone Number',
                                icon: const Icon(Icons.phone),
                                validator: (p0) =>
                                    Validation().validatePhoneNumber(p0),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          CustomDropDownButton(
                            value: controller.selectedCountry,
                            items: controller.countries
                                .map<DropdownMenuItem<Country>>(
                                  (country) => DropdownMenuItem<Country>(
                                    value: country,
                                    child: BodyText(text: country.countryName),
                                  ),
                                )
                                .toList(),
                            onChanged: (p0) async =>
                                await controller.selectCountry(p0),
                            text: 'Select Country',
                          ),
                          CustomDropDownButton(
                            value: controller.selectedState,
                            items: controller.states
                                .map<DropdownMenuItem<States>>(
                                  (state) => DropdownMenuItem<States>(
                                    value: state,
                                    child: BodyText(text: state.stateName),
                                  ),
                                )
                                .toList(),
                            onChanged: (p0) => controller.selectState(p0!),
                            text: 'Select City',
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
