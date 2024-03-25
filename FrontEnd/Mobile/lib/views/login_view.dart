import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
                  height: 10,
                ),
                CustomTextFieldWidget(
                  controller: _emailController,
                  obsecureText: false,
                  textInputType: TextInputType.emailAddress,
                  icon: const Icon(Icons.email),
                  labelText: 'Email',
                ),
                const SizedBox(
                  height: 10,
                ),
                GetBuilder<LoginController>(
                  builder: (controller) => CustomTextFieldWidget(
                    controller: _passwordController,
                    obsecureText: _loginController.passwordToggle,
                    textInputType: TextInputType.visiblePassword,
                    icon: const Icon(Icons.lock),
                    labelText: 'Password',
                    inkWell: InkWell(
                      onTap: () {
                        _loginController
                            .togglePassword(_loginController.passwordToggle);
                      },
                      child: Icon(_loginController.passwordToggle
                          ? Icons.visibility_off
                          : Icons.visibility),
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
                        style: Theme.of(context).textTheme.labelLarge,
                      ),
                    ),
                  ],
                ),

                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {},
                      style: Theme.of(context).textButtonTheme.style,
                      child: Text(
                        'Login',
                        style: Theme.of(context).textTheme.labelLarge,
                      ),
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Remember Me',
                          style: Theme.of(context).textTheme.bodyLarge,
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

                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      '_______Or Login with_______',
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                  ],
                ),
                // Row(
                //   mainAxisAlignment: MainAxisAlignment.center,
                //   children: [
                //     IconButton(
                //       onPressed: () {},
                //       icon: const Icon(FontAwesomeIcons.facebook),
                //       iconSize: 50,
                //       color: Colors.blue,
                //     ),
                //     IconButton(
                //       onPressed: () {},
                //       icon: const Icon(FontAwesomeIcons.google),
                //       iconSize: 50,
                //     ),
                //   ],
                // ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'New around here?',
                      style: Theme.of(context).textTheme.labelMedium,
                    ),
                    TextButton(
                      onPressed: () => Get.to(() => const RegisterView()),
                      child: Text(
                        'Register',
                        style: Theme.of(context).textTheme.labelLarge,
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
