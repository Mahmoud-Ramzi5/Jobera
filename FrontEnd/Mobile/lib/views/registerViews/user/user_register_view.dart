import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/registerControllers/user_register_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class UserRegisterView extends StatelessWidget {
  final UserRegisterController _userRegisterController = Get.put(
    UserRegisterController(),
  );
  UserRegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _userRegisterController.formField,
      child: GetBuilder<UserRegisterController>(
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
                        controller: controller.fullNameController,
                        textInputType: TextInputType.name,
                        obsecureText: false,
                        labelText: '5'.tr,
                        icon: Icons.abc,
                        validator: (p0) =>
                            Validation().validateRequiredField(p0),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                        child: CustomTextField(
                          controller: controller.emailController,
                          textInputType: TextInputType.emailAddress,
                          obsecureText: false,
                          labelText: '6'.tr,
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
                              labelText: '7'.tr,
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
                              labelText: '8'.tr,
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
                                controller: _userRegisterController
                                    .phoneNumberController,
                                textInputType: TextInputType.phone,
                                obsecureText: false,
                                labelText: '9'.tr,
                                icon: Icons.phone,
                                validator: (p0) =>
                                    Validation().validateNumber(p0),
                                textDirection: TextDirection.ltr,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          BodyText(text: ' ${'10'.tr} '),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: DateContainer(
                              widget: GetBuilder<UserRegisterController>(
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          GetBuilder<UserRegisterController>(
                            builder: (controller) => Row(
                              children: [
                                RadioMenuButton(
                                  value: 'MALE',
                                  groupValue: controller.selectedGender,
                                  onChanged: (value) =>
                                      controller.changeGender(value!),
                                  trailingIcon: Icon(
                                    Icons.man,
                                    color: Colors.orange.shade800,
                                  ),
                                  child: BodyText(text: '11'.tr),
                                ),
                                RadioMenuButton(
                                  value: 'FEMALE',
                                  groupValue: controller.selectedGender,
                                  onChanged: (value) =>
                                      controller.changeGender(value!),
                                  trailingIcon: Icon(
                                    Icons.woman,
                                    color: Colors.orange.shade800,
                                  ),
                                  child: BodyText(text: '12'.tr),
                                ),
                              ],
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
                            text: '13'.tr,
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
                            text: '14'.tr,
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                        child: ElevatedButton(
                          onPressed: () async {
                            if (controller.formField.currentState?.validate() ==
                                true) {
                              await controller.userRegister(
                                controller.fullNameController.text,
                                controller.emailController.text,
                                controller.passwordController.text,
                                controller.confirmPasswordController.text,
                                controller.selectedState!.stateId,
                                controller.phoneNumberController.text,
                                controller.selectedGender,
                                controller.selectedDate,
                              );
                            }
                          },
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              BodyText(text: '4'.tr),
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
                ),
              ),
      ),
    );
  }
}
