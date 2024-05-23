import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class CompanyProfileView extends StatelessWidget {
  final CompanyProfileController _profileController =
      Get.put(CompanyProfileController());

  CompanyProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: RefreshIndicator(
        key: _profileController.refreshIndicatorKey,
        onRefresh: () async => await _profileController.fetchProfile(),
        child: GetBuilder<CompanyProfileController>(
          builder: (controller) => SingleChildScrollView(
            child: Column(
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    const ProfileBackgroundContainer(),
                    ProfilePhotoContainer(
                      child: controller.company.photo == null
                          ? Icon(
                              Icons.add_a_photo,
                              size: 50,
                              color: Colors.lightBlue.shade900,
                            )
                          : null,
                      onTap: () => Dialogs().addPhotoDialog(
                        () {
                          controller.takePhotoFromCamera();
                          controller.addPhoto();
                        },
                        () {
                          controller.pickPhotoFromGallery();
                          controller.addPhoto();
                        },
                        () {},
                      ),
                    ),
                  ],
                ),
                Column(
                  children: [
                    HeadlineText(text: controller.company.name),
                    const HeadlineText(text: 'Rating:'),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () {
                            Dialogs().addBioDialog(
                              controller.editBioController,
                              () {
                                controller
                                    .editBio(controller.editBioController.text);
                                controller.refreshIndicatorKey.currentState!
                                    .show();
                              },
                            );
                          },
                          icon: Icon(
                            Icons.edit,
                            color: Colors.orange.shade800,
                          ),
                        ),
                        HeadlineText(
                          text: 'Bio: ${controller.company.description}',
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Basic Info',
                        buttonText: 'Edit',
                        icon: Icons.edit,
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
                                const BodyText(text: 'Phone Number: '),
                                LabelText(text: controller.company.phoneNumber),
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
                                const BodyText(text: 'Founding Date: '),
                                LabelText(
                                    text: controller.company.foundingDate),
                              ],
                            ),
                          ],
                        ),
                        onPressed: () {
                          Get.toNamed('/companyEditInfo');
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Portofolios',
                        buttonText: 'Add',
                        icon: Icons.add,
                        height: 160,
                        widget: const Column(),
                        onPressed: () {},
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
