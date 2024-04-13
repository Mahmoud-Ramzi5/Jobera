import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/home_controller.dart';
import 'package:jobera/customWidgets/list_tiles.dart';
import 'package:jobera/customWidgets/profile_photo_container.dart';
import 'package:jobera/views/settings_view.dart';

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
            const ProfilePhotoContainer(),
            MenuListTile(
              title: "Settings",
              icon: Icons.settings,
              onTap: () {
                Get.to(() => const SettingsView());
              },
            ),
            MenuListTile(
              title: "Logout",
              icon: Icons.logout,
              onTap: () async => Dialogs().showLogoutDialog(
                () => _homeController.logout(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
