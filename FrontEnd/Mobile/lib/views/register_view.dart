import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/register_controller.dart';
import 'package:jobera/customWidgets/custom_date_container.dart';
import 'package:jobera/customWidgets/custom_text.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  late final _formField = GlobalKey<FormState>();
  late RegisterController _registerController;
  late TextEditingController _firstNameController;
  late TextEditingController _lastNameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneNumberController;
  late TextEditingController _passwordController;
  late TextEditingController _confirmPasswordController;

  @override
  void initState() {
    _registerController = Get.put(RegisterController());
    _firstNameController = TextEditingController();
    _lastNameController = TextEditingController();
    _emailController = TextEditingController();
    _phoneNumberController = TextEditingController();
    _passwordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneNumberController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const CustomTitleText(text: 'Register')),
      body: Form(
        key: _formField,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomTextFieldWidget(
                  controller: _firstNameController,
                  textInputType: TextInputType.name,
                  obsecureText: false,
                  labelText: 'First Name',
                  icon: const Icon(Icons.person),
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Required Field";
                    }
                    return null;
                  },
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: CustomTextFieldWidget(
                    controller: _lastNameController,
                    textInputType: TextInputType.name,
                    obsecureText: false,
                    labelText: 'Last Name',
                    icon: const Icon(Icons.person),
                    validator: (p0) {
                      if (p0!.isEmpty) {
                        return "Required Field";
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: CustomTextFieldWidget(
                    controller: _emailController,
                    textInputType: TextInputType.emailAddress,
                    obsecureText: false,
                    labelText: 'Email',
                    icon: const Icon(Icons.email),
                    validator: (p0) {
                      if (p0!.isEmpty) {
                        return "Required Field!";
                      } else if (!p0.isEmail) {
                        return "Invalid Email!";
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: CustomTextFieldWidget(
                    controller: _phoneNumberController,
                    textInputType: TextInputType.phone,
                    obsecureText: false,
                    labelText: 'Phone Number',
                    icon: const Icon(Icons.phone),
                    validator: (p0) {
                      if (p0!.isEmpty) {
                        return "Required Field";
                      }
                      return null;
                    },
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
                      controller: _passwordController,
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: _registerController.passwordToggle,
                      labelText: 'Password',
                      icon: const Icon(Icons.key),
                      inkWell: InkWell(
                        onTap: () {
                          _registerController.togglePassword(
                              _registerController.passwordToggle);
                        },
                        child: Icon(_registerController.passwordToggle
                            ? Icons.visibility_off
                            : Icons.visibility),
                      ),
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return "Required Field";
                        }
                        return null;
                      },
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: GetBuilder<RegisterController>(
                    builder: (controller) => CustomTextFieldWidget(
                      controller: _confirmPasswordController,
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: _registerController.confrimPasswordToggle,
                      labelText: 'Confirm Password',
                      icon: const Icon(Icons.key),
                      inkWell: InkWell(
                        onTap: () {
                          _registerController.togglePassword(
                              _registerController.confrimPasswordToggle);
                        },
                        child: Icon(_registerController.confrimPasswordToggle
                            ? Icons.visibility_off
                            : Icons.visibility),
                      ),
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return "Required Field";
                        } else if (p0 != _passwordController.text) {
                          return "Password does not match Confirm Password";
                        }
                        return null;
                      },
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: ElevatedButton(
                      onPressed: () async {
                        if (_formField.currentState?.validate() == true) {
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
