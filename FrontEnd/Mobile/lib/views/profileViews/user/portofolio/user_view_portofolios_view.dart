import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';

class UserViewPortofoliosView extends StatelessWidget {
  const UserViewPortofoliosView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'View Portofolios'),
        actions: [
          IconButton(
            onPressed: () => Get.toNamed('/userAddPortofolio'),
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
    );
  }
}
