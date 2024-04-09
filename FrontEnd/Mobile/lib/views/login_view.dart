import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/login_controller.dart';
import 'package:jobera/customWidgets/logo_container.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/classes/validation.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';

class LoginView extends StatelessWidget {
  final LoginController _loginController = Get.put(LoginController());
  LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Form(
          key: _loginController.formField,
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Padding(
                    padding: EdgeInsets.fromLTRB(0, 0, 0, 15),
                    child: LogoContainer(imagePath: 'assets/JoberaLogo.png'),
                  ),
                  CustomTextField(
                    controller: _loginController.emailController,
                    obsecureText: false,
                    textInputType: TextInputType.emailAddress,
                    icon: const Icon(Icons.email),
                    labelText: 'Email',
                    validator: (p0) => Validation().validateEmail(p0),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                    child: GetBuilder<LoginController>(
                      builder: (controller) => CustomTextField(
                        controller: _loginController.passwordController,
                        obsecureText: _loginController.passwordToggle,
                        textInputType: TextInputType.visiblePassword,
                        icon: const Icon(Icons.key),
                        labelText: 'Password',
                        inkWell: controller.passwordInkwell(),
                        validator: (p0) =>
                            Validation().validateRequiredField(p0),
                      ),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => Get.to(() => ForgotPasswordView()),
                        child: const LabelText(text: "Forgot Password?"),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: Row(
                              children: [
                                const LabelText(text: "Remember Me ?"),
                                GetBuilder<LoginController>(
                                  builder: (controller) => Checkbox(
                                    activeColor: Colors.orange.shade800,
                                    value: controller.remeberMe,
                                    onChanged: (value) => controller
                                        .toggleRemeberMe(controller.remeberMe),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () async {
                              if (_loginController.formField.currentState
                                      ?.validate() ==
                                  true) {
                                await _loginController.login(
                                  _loginController.emailController.text,
                                  _loginController.passwordController.text,
                                  _loginController.remeberMe,
                                );
                                if (_loginController.isLoggedIn == true) {
                                  Future.delayed(
                                    const Duration(seconds: 1),
                                    () {
                                      Get.offAll(() => HomeView());
                                    },
                                  );
                                }
                              }
                            },
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const BodyText(text: "Login"),
                                Icon(
                                  Icons.login,
                                  color: Colors.lightBlue.shade900,
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      OutlinedButton(
                        onPressed: () {},
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: FaIcon(
                            FontAwesomeIcons.google,
                            color: Colors.lightBlue.shade900,
                            size: 20,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const LabelText(text: "New Around Here ?"),
                      TextButton(
                          onPressed: () => Get.to(() => const RegisterView()),
                          child: const BodyText(text: "Register")),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
