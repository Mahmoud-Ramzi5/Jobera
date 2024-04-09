import 'package:flutter/material.dart';

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
            color: Colors.orange.shade800,
          ),
        ),
      ),
      child: Icon(
        Icons.person,
        size: 50,
        color: Colors.lightBlue.shade900,
      ),
    );
  }
}
