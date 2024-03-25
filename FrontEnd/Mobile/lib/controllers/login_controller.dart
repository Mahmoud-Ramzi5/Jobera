import 'package:get/get.dart';

class LoginController extends GetxController {
  bool passwordToggle = true;
  bool remeberMe = true;

  void togglePassword(bool passwordToggle) {
    this.passwordToggle = !this.passwordToggle;
    update();
  }

  void toggleRemeberMe(bool rememberMe) {
    remeberMe = !remeberMe;
    update();
  }
}
