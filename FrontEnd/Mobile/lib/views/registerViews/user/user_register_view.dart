import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/registerControllers/user_register_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class UserRegisterView extends StatelessWidget {
  final UserRegisterController _userRegisterController =
      Get.put(UserRegisterController());
  UserRegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _userRegisterController.formField,
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomTextField(
                controller: _userRegisterController.fullNameController,
                textInputType: TextInputType.name,
                obsecureText: false,
                labelText: 'Full Name',
                icon: const Icon(Icons.abc),
                validator: (p0) => Validation().validateRequiredField(p0),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                child: CustomTextField(
                  controller: _userRegisterController.emailController,
                  textInputType: TextInputType.emailAddress,
                  obsecureText: false,
                  labelText: 'Email',
                  icon: const Icon(Icons.email),
                  validator: (p0) => Validation().validateEmail(p0),
                ),
              ),
              GetBuilder<UserRegisterController>(
                builder: (controller) => Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: CustomTextField(
                        controller: controller.passwordController,
                        textInputType: TextInputType.visiblePassword,
                        obsecureText: controller.passwordToggle,
                        labelText: 'Password',
                        icon: const Icon(Icons.key),
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
                        icon: const Icon(Icons.key),
                        inkWell: controller.passwordInkwell(),
                        validator: (p0) => Validation().validateConfirmPassword(
                            p0,
                            _userRegisterController.passwordController.text),
                      ),
                    ),
                  ],
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
                          _userRegisterController.selectCountryCode(p0),
                      initialSelection: '+963',
                    ),
                    SizedBox(
                      width: 200,
                      child: CustomTextField(
                        controller:
                            _userRegisterController.phoneNumberController,
                        textInputType: TextInputType.phone,
                        obsecureText: false,
                        labelText: 'Phone Number',
                        icon: const Icon(Icons.phone),
                        maxLength: 9,
                        validator: (p0) => Validation().validatePhineNumber(p0),
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  GetBuilder<UserRegisterController>(
                    builder: (controller) => Column(
                      children: [
                        RadioMenuButton(
                          value: 'male',
                          groupValue: controller.selectedGender,
                          onChanged: (value) => controller.changeGender(value!),
                          trailingIcon: Icon(
                            Icons.man,
                            color: Colors.orange.shade800,
                          ),
                          child: const BodyText(text: "Male"),
                        ),
                        RadioMenuButton(
                          value: 'female',
                          groupValue: controller.selectedGender,
                          onChanged: (value) => controller.changeGender(value!),
                          trailingIcon: Icon(
                            Icons.woman,
                            color: Colors.orange.shade800,
                          ),
                          child: const BodyText(text: "Female"),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    children: [
                      const BodyText(text: 'Select Birth Date:'),
                      DateContainer(
                        widget: GetBuilder<UserRegisterController>(
                          builder: (controller) => GestureDetector(
                            onTap: () =>
                                _userRegisterController.selectDate(context),
                            child: BodyText(
                              text: "${controller.selectedDate}".split(' ')[0],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              GetBuilder<UserRegisterController>(
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
                        controller.getStates(p0.countryId);
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
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                child: ElevatedButton(
                  onPressed: () async {
                    if (_userRegisterController.formField.currentState
                            ?.validate() ==
                        true) {
                      await _userRegisterController.userRegister(
                        _userRegisterController.fullNameController.text,
                        _userRegisterController.emailController.text,
                        _userRegisterController.passwordController.text,
                        _userRegisterController.confirmPasswordController.text,
                        _userRegisterController.selectedState!.stateId,
                        '${_userRegisterController.countryCode.dialCode}${_userRegisterController.phoneNumberController.text}',
                        _userRegisterController.selectedGender,
                        '${_userRegisterController.selectedDate.day}-${_userRegisterController.selectedDate.month}-${_userRegisterController.selectedDate.year}',
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
        ),
      ),
    );
  }
}
