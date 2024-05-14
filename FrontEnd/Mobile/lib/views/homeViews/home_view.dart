import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/homeControllers/home_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/list_tiles.dart';

class HomeView extends StatelessWidget {
  final HomeController _homeController = Get.put(HomeController());

  HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      drawer: SafeArea(
        child: Drawer(
          child: ListView(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Row(
                  children: [
                    Column(
                      children: [
                        const ProfilePhotoContainer(),
                        GetBuilder<HomeController>(
                          builder: (controller) => Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              HeadlineText(
                                  text: controller.isCompany
                                      ? controller.company!.name
                                      : controller.user!.name),
                              LabelText(
                                  text: controller.isCompany
                                      ? controller.company!.email
                                      : controller.user!.email),
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
                  Get.toNamed('/profile');
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
      ),
    );
  }
}
