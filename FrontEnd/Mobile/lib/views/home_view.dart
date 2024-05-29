import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/home_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/list_tiles.dart';

class HomeView extends StatelessWidget {
  final HomeController _homeController = Get.put(HomeController());

  HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      drawer: Drawer(
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Column(
                    children: [
                      GetBuilder<HomeController>(
                        builder: (controller) => Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ProfilePhotoContainer(
                              child: controller.photo == null
                                  ? controller.isCompany
                                      ? Icon(
                                          Icons.business,
                                          size: 50,
                                          color: Colors.lightBlue.shade900,
                                        )
                                      : Icon(
                                          Icons.person,
                                          size: 50,
                                          color: Colors.lightBlue.shade900,
                                        )
                                  : Image.network(
                                      'http://10.0.2.2:8000/api/image/${controller.photo}',
                                      errorBuilder:
                                          (context, error, stackTrace) =>
                                              Text(error.toString()),
                                      fit: BoxFit.contain,
                                      height: 50,
                                    ),
                            ),
                            HeadlineText(text: controller.name),
                            LabelText(text: controller.email),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Divider(
              height: 1,
            ),
            MenuListTile(
              title: "Profile",
              icon: Icons.person,
              onTap: () {
                if (_homeController.isCompany) {
                  Get.toNamed('/companyProfile');
                } else {
                  Get.toNamed('/userProfile');
                }
              },
            ),
            MenuListTile(
              title: "Settings",
              icon: Icons.settings,
              onTap: () {
                Get.toNamed('/settings');
              },
            ),
            MenuListTile(
              title: "Logout",
              icon: Icons.logout,
              onTap: () {
                Dialogs().showLogoutDialog(() => _homeController.logout());
              },
            ),
          ],
        ),
      ),
    );
  }
}
