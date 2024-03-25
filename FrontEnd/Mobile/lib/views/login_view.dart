import 'package:flutter/material.dart';
import 'package:get/get.dart' hide Response;
import 'package:jobera/controllers/login_controller.dart';
import 'package:jobera/customWidgets/custom_logo_container.dart';
import 'package:jobera/customWidgets/custom_text_field_widget.dart';
import 'package:jobera/views/forgot_password_view.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/register_view.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  late final _formField = GlobalKey<FormState>();
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
        body: Form(
          key: _formField,
          child: SingleChildScrollView(
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
                    validator: (p0) {
                      if (p0!.isEmpty) {
                        return "Required Field";
                      }
                      return null;
                    },
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
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return "Required Field";
                        }
                        return null;
                      },
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () =>
                            Get.to(() => const ForgotPasswordView()),
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
                        onPressed: () async {
                          if (_formField.currentState?.validate() == true) {
                            var response = await _loginController.login(
                                _emailController.text,
                                _passwordController.text);
                            if (_loginController.isLoggedIn == true) {
                              Get.defaultDialog(
                                title: 'Login Successful',
                                middleText: response.toString(),
                                content: const Icon(
                                  Icons.check_circle_outline,
                                  color: Colors.green,
                                ),
                              );
                              Future.delayed(const Duration(seconds: 1), () {
                                Get.off(() => const HomeView());
                              });
                            } else {
                              Get.defaultDialog(
                                title: 'Login Failed',
                                middleText: response.toString(),
                                content: const Icon(
                                  Icons.cancel_outlined,
                                  color: Colors.red,
                                ),
                              );
                            }
                          }
                        },
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
                          GetBuilder<LoginController>(
                            builder: (controller) => Checkbox(
                              activeColor: Colors.orange.shade800,
                              value: _loginController.remeberMe,
                              onChanged: (value) => _loginController
                                  .toggleRemeberMe(_loginController.remeberMe),
                            ),
                          ),
                          Text(
                            'Remember Me',
                            style: Theme.of(context).textTheme.bodyLarge,
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
      ),
    );
  }
}
