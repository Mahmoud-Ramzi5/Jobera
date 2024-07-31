import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/controllers/registerControllers/company_register_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class CompanyRegisterView extends StatelessWidget {
  final CompanyRegisterController _companyRegisterController =
      Get.put(CompanyRegisterController());
  CompanyRegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _companyRegisterController.formField,
      child: GetBuilder<CompanyRegisterController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CustomTextField(
                        controller: controller.nameController,
                        textInputType: TextInputType.name,
                        obsecureText: false,
                        labelText: 'Company Name',
                        icon: Icons.abc,
                        validator: (p0) =>
                            Validation().validateRequiredField(p0),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                        child: CustomTextField(
                          controller: controller.workFieldController,
                          textInputType: TextInputType.name,
                          obsecureText: false,
                          labelText: 'Field of Work',
                          icon: Icons.work,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                        child: CustomTextField(
                          controller: controller.emailController,
                          textInputType: TextInputType.emailAddress,
                          obsecureText: false,
                          labelText: 'Email',
                          icon: Icons.email,
                          validator: (p0) => Validation().validateEmail(p0),
                        ),
                      ),
                      Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                            child: CustomTextField(
                              controller: controller.passwordController,
                              textInputType: TextInputType.visiblePassword,
                              obsecureText: controller.passwordToggle,
                              labelText: 'Password',
                              icon: Icons.key,
                              inkWell: controller.passwordInkwell(),
                              validator: (p0) =>
                                  Validation().validateRequiredField(p0),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                            child: CustomTextField(
                              controller: controller.confirmPasswordController,
                              textInputType: TextInputType.visiblePassword,
                              obsecureText: controller.passwordToggle,
                              labelText: 'Confirm Password',
                              icon: Icons.key,
                              inkWell: controller.passwordInkwell(),
                              validator: (p0) =>
                                  Validation().validateConfirmPassword(
                                p0,
                                controller.passwordController.text,
                              ),
                            ),
                          ),
                        ],
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
                              initialSelection: '+963',
                            ),
                            Expanded(
                              flex: 1,
                              child: CustomTextField(
                                controller: controller.phoneNumberController,
                                textInputType: TextInputType.phone,
                                obsecureText: false,
                                labelText: 'Phone Number',
                                icon: Icons.phone,
                                validator: (p0) =>
                                    Validation().validateNumber(p0),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          const BodyText(text: 'Select Founding Date: '),
                          Expanded(
                            flex: 1,
                            child: DateContainer(
                              widget: GetBuilder<CompanyRegisterController>(
                                builder: (controller) => GestureDetector(
                                  onTap: () => controller.selectDate(context),
                                  child: BodyText(
                                    text: "${controller.selectedDate}"
                                        .split(' ')[0],
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
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
                          Padding(
                            padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                            child: ElevatedButton(
                              onPressed: () async {
                                if (controller.formField.currentState
                                        ?.validate() ==
                                    true) {
                                  controller.companyRegister(
                                    controller.nameController.text,
                                    controller.workFieldController.text,
                                    controller.emailController.text,
                                    controller.passwordController.text,
                                    controller.confirmPasswordController.text,
                                    controller.selectedState!.stateId,
                                    controller.phoneNumberController.text,
                                    controller.selectedDate,
                                  );
                                }
                              },
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const BodyText(text: "Register"),
                                  Icon(
                                    Icons.app_registration_rounded,
                                    color: Colors.lightBlue.shade900,
                                  )
                                ],
                              ),
                            ),
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
