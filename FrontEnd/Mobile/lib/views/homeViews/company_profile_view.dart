import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/homeControllers/profile_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class CompanyProfileView extends StatelessWidget {
  final ProfileController _profileController = Get.put(ProfileController());

  CompanyProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: GetBuilder<ProfileController>(
          builder: (controller) => Column(
            children: [
              const Stack(
                alignment: Alignment.center,
                children: [
                  ProfileBackgroundContainer(),
                  ProfilePhotoContainer(),
                ],
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  children: [
                    HeadlineText(text: controller.company.name),
                    const HeadlineText(text: 'Rating:'),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () {
                            Dialogs().addBioDialog(
                              controller.company.description,
                              () {},
                            );
                          },
                          icon: Icon(
                            Icons.edit,
                            color: Colors.orange.shade800,
                          ),
                        ),
                        HeadlineText(
                            text: 'Bio: ${controller.company.description}'),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Basic Info',
                        height: 200,
                        widget: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const BodyText(text: 'Field: '),
                                LabelText(text: controller.company.field),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Email: '),
                                LabelText(text: controller.company.email),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Location: '),
                                LabelText(
                                    text:
                                        '${controller.company.state} - ${controller.company.country}'),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Phone Number: '),
                                LabelText(text: controller.company.phoneNumber),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Founding Date: '),
                                LabelText(text: controller.company.foundingDate)
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Portofolios',
                        height: 160,
                        widget: Column(),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
