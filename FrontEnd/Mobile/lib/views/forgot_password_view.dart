import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/forgot_password_controller.dart';
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
    Get.delete<ForgotPasswordController>();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Forgot Passsword"),
        titleTextStyle: Theme.of(context).textTheme.titleLarge,
      ),
      body: Form(
          key: _formField,
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Enter your email to recieve a rest password email.',
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: CustomTextFieldWidget(
                      controller: _emailController,
                      textInputType: TextInputType.emailAddress,
                      obsecureText: false,
                      labelText: 'email',
                      icon: const Icon(Icons.email),
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return "Required Field";
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
                            backgroundColor: Colors.lightBlue.shade800,
                            content: Column(
                              children: [
                                const Icon(
                                  Icons.check_circle_outline,
                                  color: Colors.green,
                                ),
                                Text(response as String),
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
                                Text(response),
                              ],
                            ),
                          );
                        }
                      }
                    },
                    style: Theme.of(context).textButtonTheme.style,
                    child: Text(
                      'Submit',
                      style: Theme.of(context).textTheme.labelLarge,
                    ),
                  )
                ],
              ),
            ),
          )),
    );
  }
}
