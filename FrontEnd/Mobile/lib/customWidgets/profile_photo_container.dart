import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ProfilePhotoContainer extends StatelessWidget {
  const ProfilePhotoContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      height: 120,
      width: 120,
      decoration: ShapeDecoration(
        shape: CircleBorder(
          side: BorderSide(
            color: Colors.lightBlue.shade900,
          ),
        ),
      ),
      child: GestureDetector(
        onTap: () {
          Get.defaultDialog();
        },
        child: Icon(
          Icons.add_a_photo_outlined,
          size: 50,
          color: Colors.orange.shade800,
        ),
      ),
    );
  }
}
