import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/list_tiles.dart';
import 'package:jobera/customWidgets/settings_single_section.dart';

class SettingsView extends StatelessWidget {
  const SettingsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Settings'),
      ),
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 400),
          child: ListView(
            children: [
              SingleSection(
                title: "General",
                children: [
                  SettingsListTile(
                    title: "Dark Mode",
                    icon: Icons.dark_mode_outlined,
                    trailing: GetBuilder<SettingsController>(
                      builder: (controller) => Switch(
                        value: controller.isDarkMode,
                        onChanged: (value) => controller.changeTheme(value),
                      ),
                    ),
                  ),
                  const SettingsListTile(
                    title: "Notifications",
                    icon: Icons.notifications_none_rounded,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
