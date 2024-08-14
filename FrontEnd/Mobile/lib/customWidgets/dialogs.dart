import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/validation.dart';

class Dialogs {
  Future<void> loadingDialog() async {
    Get.defaultDialog(
      title: '131'.tr,
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
      title: '96'.tr,
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: BodyText(text: '132'.tr),
      confirm: GestureDetector(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: BodyText(text: '133'.tr),
        ),
      ),
      cancel: GestureDetector(
        onTap: () => Get.back(),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: BodyText(text: '134'.tr),
        ),
      ),
    );
  }

  Future<void> showSesionExpiredDialog() async {
    Get.defaultDialog(
      title: '135'.tr,
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
          Padding(
            padding: const EdgeInsets.all(5),
            child: BodyText(text: '136'.tr),
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
      title: '137'.tr,
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: CustomTextField(
        controller: controller,
        textInputType: TextInputType.text,
        obsecureText: false,
        labelText: '26'.tr,
        icon: Icons.description,
      ),
      cancel: OutlinedButton(
        onPressed: () => Get.back(),
        child: LabelText(text: '128'.tr),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: LabelText(text: '23'.tr),
      ),
    );
  }

  Future<void> addPhotoDialog(
    void Function()? onPressed1,
    void Function()? onPressed2,
    void Function()? onPressed3,
  ) async {
    Get.defaultDialog(
      title: '139'.tr,
      content: Column(
        children: [
          TextButton(
            onPressed: onPressed1,
            child: LabelText(text: '140'.tr),
          ),
          TextButton(
            onPressed: onPressed2,
            child: LabelText(text: '141'.tr),
          ),
          TextButton(
            onPressed: onPressed3,
            child: LabelText(text: '142'.tr),
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
        child: LabelText(text: '134'.tr),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: LabelText(text: '133'.tr),
      ),
    );
  }

  Future<void> redeemCodeDialog(
    TextEditingController controller,
    void Function()? onPressed,
  ) async {
    Get.defaultDialog(
      title: '74'.tr,
      titleStyle: TextStyle(
        color: Colors.orange.shade800,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: CustomTextField(
        controller: controller,
        textInputType: TextInputType.text,
        obsecureText: false,
        labelText: '143'.tr,
        icon: Icons.numbers,
        validator: (p0) => Validation().validateRequiredField(p0),
      ),
      confirm: OutlinedButton(
        onPressed: onPressed,
        child: LabelText(text: '144'.tr),
      ),
    );
  }
}
