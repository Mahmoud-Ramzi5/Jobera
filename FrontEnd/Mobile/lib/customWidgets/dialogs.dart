import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/validation.dart';

class Dialogs {
  Future<void> loadingDialog() async {
    Get.defaultDialog(
      title: 'Loading....',
      content: const CircularProgressIndicator(),
    );
  }

  Future<void> showErrorDialog(String title, String content) async {
    Get.defaultDialog(
      title: title,
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.cancel_outlined,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: BodyText(text: content),
          ),
        ],
      ),
    );
  }

  Future<void> showSuccessDialog(
    String title,
    String content,
  ) async {
    Get.defaultDialog(
      title: title,
      titleStyle: const TextStyle(
        color: Colors.green,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.check_circle_outline,
            color: Colors.green,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: BodyText(text: content),
          )
        ],
      ),
    );
  }

  Future<void> showLogoutDialog(void Function()? onTap) async {
    Get.defaultDialog(
      title: "Logout",
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: const BodyText(text: "Are you sure you want to logout?"),
      confirm: GestureDetector(
        onTap: onTap,
        child: const Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: BodyText(text: 'Yes'),
        ),
      ),
      cancel: GestureDetector(
        onTap: () => Get.back(),
        child: const Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: BodyText(text: "No"),
        ),
      ),
    );
  }

  Future<void> showSesionExpiredDialog() async {
    Get.defaultDialog(
      title: 'Session expired',
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: const Column(
        children: [
          Icon(
            Icons.timer_off,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: EdgeInsets.all(5),
            child: BodyText(text: 'Please Login again'),
          ),
        ],
      ),
    );
  }

  Future<void> addBioDialog(
    TextEditingController controller,
    String? bio,
    void Function()? onPressed,
  ) async {
    bio != null ? controller.text = bio : null;
    Get.defaultDialog(
      title: "Add bio",
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: CustomTextField(
        controller: controller,
        textInputType: TextInputType.text,
        obsecureText: false,
        labelText: 'Bio',
        icon: Icons.description,
      ),
      cancel: OutlinedButton(
        onPressed: () => Get.back(),
        child: const LabelText(text: 'Cancel'),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: const LabelText(text: 'Submit'),
      ),
    );
  }

  Future<void> addPhotoDialog(
    void Function()? onPressed1,
    void Function()? onPressed2,
    void Function()? onPressed3,
  ) async {
    Get.defaultDialog(
      title: 'Photo:',
      content: Column(
        children: [
          TextButton(
            onPressed: onPressed1,
            child: const LabelText(text: 'Take Photo'),
          ),
          TextButton(
            onPressed: onPressed2,
            child: const LabelText(text: 'Upload Photo'),
          ),
          TextButton(
            onPressed: onPressed3,
            child: const LabelText(text: 'Remove Photo'),
          ),
        ],
      ),
    );
  }

  Future<void> confirmDialog(
    String title,
    String text,
    void Function()? onPressed,
  ) async {
    Get.defaultDialog(
      title: title,
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: BodyText(text: text),
      cancel: OutlinedButton(
        onPressed: () => Get.back(),
        child: const LabelText(text: 'No'),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: const LabelText(text: 'Yes'),
      ),
    );
  }

  Future<void> redeemCodeDialog(
    TextEditingController controller,
    void Function()? onPressed,
  ) async {
    Get.defaultDialog(
      title: 'Redeem Code',
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: CustomTextField(
        controller: controller,
        textInputType: TextInputType.text,
        obsecureText: false,
        labelText: 'Code',
        icon: Icons.numbers,
        validator: (p0) => Validation().validateRequiredField(p0),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: const LabelText(text: 'Redeem'),
      ),
    );
  }
}
