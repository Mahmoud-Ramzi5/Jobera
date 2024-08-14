import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/loginControllers/login_controller.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/validation.dart';

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
                    icon: Icons.email,
                    labelText: '6'.tr,
                    validator: (p0) => Validation().validateEmail(p0),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                    child: GetBuilder<LoginController>(
                      builder: (controller) => CustomTextField(
                        controller: _loginController.passwordController,
                        obsecureText: _loginController.passwordToggle,
                        textInputType: TextInputType.visiblePassword,
                        icon: Icons.key,
                        labelText: '7'.tr,
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
                        onPressed: () => Get.toNamed('/forgotPassword'),
                        child: LabelText(text: "18".tr),
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
                                LabelText(text: '19'.tr),
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
                              }
                            },
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                BodyText(text: '20'.tr),
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
                        onPressed: () => _loginController.handleGoogleSignIn(),
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
                      LabelText(text: '21'.tr),
                      TextButton(
                        onPressed: () => Get.toNamed('/register'),
                        child: BodyText(text: '4'.tr),
                      ),
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
