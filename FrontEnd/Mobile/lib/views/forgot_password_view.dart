import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/forgot_password_controller.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/classes/validation.dart';

class ForgotPasswordView extends StatelessWidget {
  final ForgotPasswordController _forgotPasswordController =
      Get.put(ForgotPasswordController());
  ForgotPasswordView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const TitleText(text: "Forgot Password")),
      body: Form(
        key: _forgotPasswordController.formField,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const BodyText(
                    text: "Enter your email to recieve a rest password email."),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: CustomTextField(
                    controller: _forgotPasswordController.emailController,
                    textInputType: TextInputType.emailAddress,
                    obsecureText: false,
                    labelText: 'Email',
                    icon: const Icon(Icons.email),
                    validator: (p0) => Validation().validateEmail(p0),
                  ),
                ),
                ElevatedButton(
                  onPressed: () async {
                    if (_forgotPasswordController.formField.currentState
                            ?.validate() ==
                        true) {
                      await _forgotPasswordController.forgotPassword(
                          _forgotPasswordController.emailController.text);
                    }
                  },
                  child: const BodyText(text: "Submit"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
