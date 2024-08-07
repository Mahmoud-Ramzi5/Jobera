import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/texts.dart';

class MenuListTile extends StatelessWidget {
  final String title;
  final IconData icon;
  final void Function()? onTap;
  final int? count;

  const MenuListTile({
    super.key,
    required this.title,
    required this.icon,
    required this.onTap,
    this.count,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(
        children: [
          BodyText(
            text: title,
          ),
          if (count != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
              child: Text(
                count! > 10 ? '+10' : '$count',
                style: const TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
        ],
      ),
      leading: Icon(
        icon,
        color: Colors.orange.shade800,
      ),
      onTap: onTap,
    );
  }
}

class SettingsListTile extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget? trailing;
  const SettingsListTile({
    super.key,
    required this.title,
    required this.icon,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: BodyText(text: title),
      leading: Icon(
        icon,
        color: Colors.orange.shade900,
      ),
      trailing: trailing,
      onTap: () {},
    );
  }
}
