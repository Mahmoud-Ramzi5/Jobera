import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:jobera/Theme_and_Style/custom_text_style.dart';
import 'package:jobera/controllers/login_controller.dart';
import 'package:jobera/customWidgets/custom_logo_container.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/register_view.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  late LoginController _loginController;
  late TextEditingController _emailController;
  late TextEditingController _passwordController;

  @override
  void initState() {
    _loginController = Get.put(LoginController());
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    Get.delete<LoginController>();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        // appBar: AppBar(
        //   title: const Text('Login'),
        // ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(18.0),
            child: Column(
              children: [
                const CustomLogoContainer(imagePath: 'assets/JoberaLogo.png'),
                const SizedBox(
                  height: 15,
                ),
                CustomTextFieldWidget(
                  controller: _emailController,
                  labelText: 'Email',
                  icon: const Icon(Icons.email),
                  obsecureText: false,
                  inputType: TextInputType.emailAddress,
                ),
                const SizedBox(
                  height: 10,
                ),
                GetBuilder<LoginController>(
                  builder: (controller) => CustomTextFieldWidget(
                    controller: _passwordController,
                    labelText: 'Password',
                    icon: const Icon(Icons.lock),
                    obsecureText: _loginController.passwordToggle,
                    inputType: TextInputType.visiblePassword,
                    inkWell: InkWell(
                      onTap: () => _loginController
                          .togglePassword(_loginController.passwordToggle),
                      child: Icon(_loginController.passwordToggle
                          ? Icons.visibility
                          : Icons.visibility_off),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => Get.to(() => const ForgotPasswordView()),
                      child: Text(
                        'Forgot Password?',
                        style: CustomTextStyle().mediumTextStyle,
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        'Login',
                        style: CustomTextStyle().bigTextStyle,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Remember Me',
                          style: CustomTextStyle().mediumTextStyle,
                        ),
                        GetBuilder<LoginController>(
                          builder: (controller) => Checkbox(
                            activeColor: Colors.orange.shade800,
                            value: _loginController.remeberMe,
                            onChanged: (value) => _loginController
                                .toggleRemeberMe(_loginController.remeberMe),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      '_______Or Login with_______',
                      style: CustomTextStyle().bigTextStyle,
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.facebook),
                      iconSize: 50,
                      color: Colors.blue,
                    ),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.google),
                      iconSize: 50,
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'New around here?',
                      style: CustomTextStyle().mediumTextStyle,
                    ),
                    TextButton(
                      onPressed: () => Get.to(() => const RegisterView()),
                      child: Text(
                        'Register',
                        style: CustomTextStyle().bigTextStyle,
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
