import 'package:flutter/material.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          const Expanded(
            flex: 1,
            child: Stack(
              children: [
                ProfileBackgroundContainer(),
                Align(
                    alignment: Alignment.bottomCenter,
                    child: ProfilePhotoContainer())
              ],
            ),
          ),
          Expanded(
            flex: 3,
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                children: [
                  const HeadlineText(text: "Richie Lorie"),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        FloatingActionButton.extended(
                          onPressed: () {},
                          label: const BodyText(text: 'Edit'),
                          icon: Icon(
                            Icons.edit,
                            color: Colors.lightBlue.shade900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
