import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/register_controller.dart';
import 'package:jobera/customWidgets/code_picker.dart';
import 'package:jobera/customWidgets/date_container.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class UserRegisterView extends StatelessWidget {
  final RegisterController _registerController = Get.put(RegisterController());
  UserRegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _registerController.formField,
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomTextField(
                controller: _registerController.fullNameController,
                textInputType: TextInputType.name,
                obsecureText: false,
                labelText: 'Full Name',
                icon: const Icon(Icons.abc),
                validator: (p0) => Validation().validateRequiredField(p0),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                child: CustomTextField(
                  controller: _registerController.emailController,
                  textInputType: TextInputType.emailAddress,
                  obsecureText: false,
                  labelText: 'Email',
                  icon: const Icon(Icons.email),
                  validator: (p0) => Validation().validateEmail(p0),
                ),
              ),
              GetBuilder<RegisterController>(
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
                            p0, _registerController.passwordController.text),
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
                          _registerController.selectCountryCode(p0),
                    ),
                    SizedBox(
                      width: 200,
                      child: CustomTextField(
                        controller: _registerController.phoneNumberController,
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
              GetBuilder<RegisterController>(
                builder: (controller) => Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    CustomDropDownButton(
                      value: controller.selectedCountry,
                      items: controller.countryOptions
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
                      items: controller.stateOptions
                          .map<DropdownMenuItem<States>>(
                            (state) => DropdownMenuItem<States>(
                              value: state,
                              child: BodyText(text: state.stateName),
                            ),
                          )
                          .toList(),
                      onChanged: (p0) => controller.selectState(p0!),
                      text: 'Select State',
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Column(
                    children: [
                      DateContainer(
                        widget: GetBuilder<RegisterController>(
                          builder: (controller) => BodyText(
                            text: "${controller.selectedDate}".split(' ')[0],
                          ),
                        ),
                      ),
                      OutlinedButton(
                        onPressed: () =>
                            _registerController.selectDate(context),
                        child: const BodyText(text: "Select Birthdate"),
                      ),
                    ],
                  ),
                  GetBuilder<RegisterController>(
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
                ],
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                child: ElevatedButton(
                  onPressed: () async {
                    if (_registerController.formField.currentState
                            ?.validate() ==
                        true) {
                      await _registerController.userRegister(
                        _registerController.fullNameController.text,
                        _registerController.emailController.text,
                        _registerController.passwordController.text,
                        _registerController.confirmPasswordController.text,
                        _registerController.selectedCountry!.countryName,
                        _registerController.selectedState!.stateName,
                        '${_registerController.countryCode.dialCode}${_registerController.phoneNumberController.text}',
                        _registerController.selectedGender,
                        '${_registerController.selectedDate.day}-${_registerController.selectedDate.month}-${_registerController.selectedDate.year}',
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
