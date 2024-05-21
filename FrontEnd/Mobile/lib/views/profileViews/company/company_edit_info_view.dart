import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/controllers/profileControllers/company/company_edit_info_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class CompanyEditInfoView extends StatelessWidget {
  final CompanyEditInfoController _editController =
      Get.put(CompanyEditInfoController());

  CompanyEditInfoView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Edit Info'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(10),
            child: CustomTextField(
              controller: _editController.editNameController,
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
              controller: _editController.editFieldController,
              textInputType: TextInputType.name,
              obsecureText: false,
              labelText: 'Field of Work',
              icon: const Icon(Icons.work),
              validator: (p0) => Validation().validateRequiredField(p0),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CodePicker(
                  onChange: (p0) {},
                  initialSelection: _editController
                      .profileController.company.phoneNumber
                      .substring(0, 4),
                ),
                SizedBox(
                  width: 200,
                  child: CustomTextField(
                    controller: _editController.editPhoneNumberController,
                    textInputType: TextInputType.phone,
                    obsecureText: false,
                    labelText: 'Phone Number',
                    icon: const Icon(Icons.phone),
                    maxLength: 9,
                    validator: (p0) => Validation().validatePhoneNumber(p0),
                  ),
                ),
              ],
            ),
          ),
          GetBuilder<CompanyEditInfoController>(
            builder: (controller) => Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                CustomDropDownButton(
                  value: controller.selectedCountry,
                  items: controller.countries
                      .map<DropdownMenuItem<Countries>>(
                        (country) => DropdownMenuItem<Countries>(
                          value: country,
                          child: BodyText(text: country.countryName),
                        ),
                      )
                      .toList(),
                  onChanged: (p0) {
                    controller.selectCountry(p0!);
                    controller.getStates(p0.countryName);
                  },
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
                ElevatedButton(
                  onPressed: () {},
                  child: const BodyText(text: 'Submit'),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
