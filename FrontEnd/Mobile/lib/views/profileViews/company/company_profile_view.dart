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
                    ProfileBackgroundContainer(
                      child: controller.company.photo == null
                          ? Icon(
                              Icons.business,
                              size: 50,
                              color: Colors.lightBlue.shade900,
                            )
                          : Image.network(
                              'http://192.168.0.101/api/image/${controller.company.photo}',
                              errorBuilder: (context, error, stackTrace) =>
                                  Text(error.toString()),
                            ),
                      onPressed: () => Dialogs().addPhotoDialog(
                        () async {
                          await controller.takePhotoFromCamera();
                          await controller.addPhoto();
                        },
                        () async {
                          await controller.pickPhotoFromGallery();
                          await controller.addPhoto();
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
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Bio:',
                        buttonText: 'Edit',
                        icon: Icons.edit,
                        widget: BodyText(
                          text: '${controller.company.description}',
                        ),
                        onPressed: () => Dialogs().addBioDialog(
                          controller.editBioController,
                          () {
                            controller
                                .editBio(controller.editBioController.text);
                            controller.refreshIndicatorKey.currentState!.show();
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Basic Info',
                        buttonText: 'Edit',
                        icon: Icons.edit,
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
