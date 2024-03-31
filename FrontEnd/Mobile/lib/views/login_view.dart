import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/login_controller.dart';
import 'package:jobera/customWidgets/custom_logo_container.dart';
import 'package:jobera/customWidgets/custom_text.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/register_view.dart';

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
                    child:
                        CustomLogoContainer(imagePath: 'assets/JoberaLogo.png'),
                  ),
                  CustomTextFieldWidget(
                    controller: _loginController.emailController,
                    obsecureText: false,
                    textInputType: TextInputType.emailAddress,
                    icon: const Icon(Icons.email),
                    labelText: 'Email',
                    validator: (p0) {
                      if (p0!.isEmpty) {
                        return "Required Field";
                      } else if (!p0.isEmail) {
                        return "Invalid Email";
                      }
                      return null;
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                    child: GetBuilder<LoginController>(
                      builder: (controller) => CustomTextFieldWidget(
                        controller: _loginController.passwordController,
                        obsecureText: _loginController.passwordToggle,
                        textInputType: TextInputType.visiblePassword,
                        icon: const Icon(Icons.key),
                        labelText: 'Password',
                        inkWell: InkWell(
                          onTap: () {
                            controller
                                .togglePassword(controller.passwordToggle);
                          },
                          child: Icon(controller.passwordToggle
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => Get.to(() => ForgotPasswordView()),
                        child:
                            const CustomHeadlineText(text: "Forgot Password?"),
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
                                const CustomLabelText(text: "Remember Me ?"),
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
                                  var response = await _loginController.login(
                                    _loginController.emailController.text,
                                    _loginController.passwordController.text,
                                    _loginController.remeberMe,
                                  );
                                  if (_loginController.isLoggedIn == true) {
                                    Get.defaultDialog(
                                      title: 'Login Successful',
                                      backgroundColor:
                                          Colors.lightBlue.shade100,
                                      content: const Icon(
                                        Icons.check_circle_outline,
                                        color: Colors.green,
                                      ),
                                    );
                                    Future.delayed(const Duration(seconds: 1),
                                        () {
                                      Get.offAll(() => const HomeView());
                                    });
                                  } else {
                                    Get.defaultDialog(
                                      title: 'Login Failed',
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
                              child: const CustomLabelText(text: "Login")),
                        ],
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: () {},
                        child: Row(
                          children: [
                            const CustomBodyText(text: "Login With Google"),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: FaIcon(
                                FontAwesomeIcons.google,
                                color: Colors.lightBlue.shade900,
                                size: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const CustomLabelText(text: "New Around Here ?"),
                      TextButton(
                          onPressed: () => Get.to(() => RegisterView()),
                          child: const CustomHeadlineText(text: "Register")),
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
