import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';

class Dialogs {
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

  Future<void> showSuccessDialog(String title, String content) async {
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

  Future<void> showSesionExpiredDialog(String error) async {
    Get.defaultDialog(
      title: 'Session expired',
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.timer_off,
            color: Colors.red,
            size: 40,
          ),
          const Padding(
            padding: EdgeInsets.all(5),
            child: BodyText(text: 'Please Login again'),
          ),
          Padding(
            padding: const EdgeInsets.all(5),
            child: BodyText(text: error),
          ),
        ],
      ),
    );
  }

  Future<void> addBioDialog(String? bio, void Function()? onPressed) async {
    Get.defaultDialog(
      title: "Add bio",
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: CustomTextField(
        controller: TextEditingController(text: bio),
        textInputType: TextInputType.text,
        obsecureText: false,
        labelText: 'Bio',
        icon: const Icon(Icons.description),
      ),
      cancel: OutlinedButton(
        onPressed: () => Get.back(),
        child: const LabelText(text: 'Cancel'),
      ),
      confirm: OutlinedButton(
        onPressed: () => onPressed,
        child: const LabelText(text: 'Submit'),
      ),
    );
  }
}
