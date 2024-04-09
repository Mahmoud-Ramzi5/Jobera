import 'package:flutter/material.dart';
import 'package:jobera/classes/texts.dart';
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
                    trailing: Switch(value: true, onChanged: (value) {}),
                  ),
                  const SettingsListTile(
                      title: "Notifications",
                      icon: Icons.notifications_none_rounded),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
