import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
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
        title: TitleText(text: '68'.tr),
      ),
      body: GetBuilder<SettingsController>(
        builder: (controller) => Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 400),
            child: ListView(
              children: [
                SingleSection(
                  title: '69'.tr,
                  children: [
                    SettingsListTile(
                      title: '70'.tr,
                      icon: Icons.dark_mode_outlined,
                      trailing: Switch(
                        value: controller.isDarkMode,
                        onChanged: (value) => controller.changeTheme(value),
                      ),
                    ),
                    SettingsListTile(
                      title: '183'.tr,
                      icon: Icons.language,
                    ),
                    CustomDropDownButton(
                      value: controller.selectedLang,
                      items: controller.langs.entries.map((entry) {
                        return DropdownMenuItem<String>(
                          value: entry.value,
                          child: BodyText(
                            text: entry.key,
                          ),
                        );
                      }).toList(),
                      onChanged: (p0) => controller.changeLang(
                        p0.toString(),
                      ),
                      text: '13'.tr,
                    ),
                  ],
                ),
                SingleSection(
                  title: '190'.tr,
                  children: [
                    OutlinedButton(
                      onPressed: () async => await controller.verifyEmail(),
                      child: BodyText(text: '191'.tr),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
