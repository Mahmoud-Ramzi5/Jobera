import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/forgot_password_controller.dart';
import 'package:jobera/customWidgets/custom_text.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';

class ForgotPasswordView extends StatefulWidget {
  const ForgotPasswordView({super.key});

  @override
  State<ForgotPasswordView> createState() => _ForgotPasswordViewState();
}

class _ForgotPasswordViewState extends State<ForgotPasswordView> {
  late final _formField = GlobalKey<FormState>();
  late ForgotPasswordController _forgotPasswordController;
  late TextEditingController _emailController;

  @override
  void initState() {
    _forgotPasswordController = Get.put(ForgotPasswordController());
    _emailController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const CustomTitleText(text: "Forgot Password")),
      body: Form(
        key: _formField,
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
                ElevatedButton(
                  onPressed: () async {
                    if (_formField.currentState?.validate() == true) {
                      var response = await _forgotPasswordController
                          .forgotPassword(_emailController.text);
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
                  child: const CustomLabelText(text: "Submit"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
