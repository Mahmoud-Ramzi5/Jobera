import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/register_controller.dart';
import 'package:jobera/customWidgets/custom_date_container.dart';
import 'package:jobera/customWidgets/custom_text.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';
import 'package:jobera/customWidgets/custom_validation.dart';

class RegisterView extends StatelessWidget {
  final RegisterController _registerController = Get.put(RegisterController());
  RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const CustomTitleText(text: 'Register')),
      body: Form(
        key: _registerController.formField,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomTextFieldWidget(
                  controller: _registerController.firstNameController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'First Name',
                  icon: const Icon(Icons.person),
                  validator: (p0) =>
                      CustomValidation().validateRequiredField(p0),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: CustomTextFieldWidget(
                    controller: _registerController.lastNameController,
                    textInputType: TextInputType.name,
                    obsecureText: false,
                    labelText: 'Last Name',
                    icon: const Icon(Icons.person),
                    validator: (p0) =>
                        CustomValidation().validateRequiredField(p0),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: CustomTextFieldWidget(
                    controller: _registerController.emailController,
                    textInputType: TextInputType.emailAddress,
                    obsecureText: false,
                    labelText: 'Email',
                    icon: const Icon(Icons.email),
                    validator: (p0) => CustomValidation().validateEmail(p0),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CountryCodePicker(
                        showDropDownButton: true,
                        initialSelection: '+963',
                        onChanged: (value) =>
                            _registerController.changeCountryCode(value),
                      ),
                      SizedBox(
                        width: 200,
                        child: CustomTextFieldWidget(
                          controller: _registerController.phoneNumberController,
                          textInputType: TextInputType.phone,
                          obsecureText: false,
                          labelText: 'Phone Number',
                          icon: const Icon(Icons.phone),
                          maxLength: 9,
                          validator: (p0) =>
                              CustomValidation().validateRequiredField(p0),
                        ),
                      ),
                    ],
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        CustomDateContainer(
                          widget: GetBuilder<RegisterController>(
                            builder: (controller) => CustomBodyText(
                              text: "${controller.selectedDate}".split(' ')[0],
                            ),
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () =>
                              _registerController.selectDate(context),
                          child:
                              const CustomLabelText(text: "Select Birthdate"),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        GetBuilder<RegisterController>(
                          builder: (controller) => RadioMenuButton(
                            value: 'male',
                            groupValue: controller.selectedGender,
                            onChanged: (value) =>
                                controller.changeGender(value!),
                            trailingIcon: Icon(
                              Icons.man,
                              color: Colors.orange.shade800,
                            ),
                            child: const CustomBodyText(text: "Male"),
                          ),
                        ),
                        GetBuilder<RegisterController>(
                          builder: (controller) => RadioMenuButton(
                            value: 'female',
                            groupValue: controller.selectedGender,
                            onChanged: (value) =>
                                controller.changeGender(value!),
                            trailingIcon: Icon(
                              Icons.woman,
                              color: Colors.orange.shade800,
                            ),
                            child: const CustomBodyText(text: "Female"),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: GetBuilder<RegisterController>(
                    builder: (controller) => CustomTextFieldWidget(
                      controller: controller.passwordController,
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: controller.passwordToggle,
                      labelText: 'Password',
                      icon: const Icon(Icons.key),
                      inkWell: controller.passwordInkwell(),
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: GetBuilder<RegisterController>(
                    builder: (controller) => CustomTextFieldWidget(
                      controller: controller.confirmPasswordController,
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: controller.passwordToggle,
                      labelText: 'Confirm Password',
                      icon: const Icon(Icons.key),
                      inkWell: controller.passwordInkwell(),
                      validator: (p0) => CustomValidation()
                          .validateConfirmPassword(
                              p0, _registerController.passwordController.text),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: ElevatedButton(
                      onPressed: () async {
                        if (_registerController.formField.currentState
                                ?.validate() ==
                            true) {
                          if (_registerController.isRegistered == true) {
                            Get.defaultDialog(
                              title: 'Register Successful',
                              backgroundColor: Colors.lightBlue.shade100,
                              content: const Icon(
                                Icons.check_circle_outline,
                                color: Colors.green,
                              ),
                            );
                          } else {
                            Get.defaultDialog(
                              title: 'Register Failed',
                              backgroundColor: Colors.orange.shade100,
                              content: const Column(
                                children: [
                                  Icon(
                                    Icons.cancel_outlined,
                                    color: Colors.red,
                                  ),
                                  //Text(response),
                                ],
                              ),
                            );
                          }
                        }
                      },
                      child: const CustomLabelText(text: "Register")),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const CustomLabelText(text: "Already Registered?"),
                    TextButton(
                        onPressed: () => Get.back(),
                        child: const CustomHeadlineText(text: "Login")),
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
