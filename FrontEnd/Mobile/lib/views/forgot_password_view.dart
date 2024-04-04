import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/forgot_password_controller.dart';
import 'package:jobera/customWidgets/custom_text.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';
import 'package:jobera/customWidgets/custom_validation.dart';

class ForgotPasswordView extends StatelessWidget {
  final ForgotPasswordController _forgotPasswordController =
      Get.put(ForgotPasswordController());
  ForgotPasswordView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const CustomTitleText(text: "Forgot Password")),
      body: Form(
        key: _forgotPasswordController.formField,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CustomBodyText(
                    text: "Enter your email to recieve a rest password email."),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: CustomTextFieldWidget(
                    controller: _forgotPasswordController.emailController,
                    textInputType: TextInputType.emailAddress,
                    obsecureText: false,
                    labelText: 'Email',
                    icon: const Icon(Icons.email),
                    validator: (p0) => CustomValidation().validateEmail(p0),
                  ),
                ),
                ElevatedButton(
                  onPressed: () async {
                    if (_forgotPasswordController.formField.currentState
                            ?.validate() ==
                        true) {
                      var response =
                          await _forgotPasswordController.forgotPassword(
                              _forgotPasswordController.emailController.text);
                      if (_forgotPasswordController.isEmailSentSuccessfully ==
                          true) {
                        Get.defaultDialog(
                          title: 'Success',
                          backgroundColor: Colors.lightBlue.shade100,
                          content: Column(
                            children: [
                              const Icon(
                                Icons.check_circle_outline,
                                color: Colors.green,
                              ),
                              CustomBodyText(text: response),
                            ],
                          ),
                        );
                      } else {
                        Get.defaultDialog(
                          title: 'Failed',
                          backgroundColor: Colors.orange.shade100,
                          content: Column(
                            children: [
                              const Icon(
                                Icons.cancel_outlined,
                                color: Colors.red,
                              ),
                              CustomBodyText(text: response),
                            ],
                          ),
                        );
                      }
                    }
                  },
                  style: Theme.of(context).textButtonTheme.style,
                  child: const CustomBodyText(text: "Submit"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
