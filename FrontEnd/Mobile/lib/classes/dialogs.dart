import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';

class Dialogs {
  Future<void> showErrorDialog(
      String title, String content, BuildContext? context) async {
    Get.defaultDialog(
      title: title,
      titleStyle: Theme.of(context!).textTheme.titleLarge,
      backgroundColor: Colors.orange.shade100,
      content: Column(
        children: [
          const Icon(
            Icons.cancel_outlined,
            color: Colors.red,
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
      String title, String content, BuildContext? context) async {
    Get.defaultDialog(
      title: title,
      titleStyle: Theme.of(context!).textTheme.titleLarge,
      backgroundColor: Colors.lightBlue.shade100,
      content: Column(
        children: [
          const Icon(
            Icons.check_circle_outline,
            color: Colors.green,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: BodyText(text: content),
          )
        ],
      ),
    );
  }

  Future<void> showLogoutDialog(
      void Function()? onTap, BuildContext context) async {
    Get.defaultDialog(
      backgroundColor: Colors.lightBlue.shade100,
      title: "Logout",
      titleStyle: Theme.of(context).textTheme.titleLarge,
      middleText: "Are you sure you want to logout?",
      middleTextStyle: Theme.of(context).textTheme.labelLarge,
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
}
