import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class UserProfileView extends StatelessWidget {
  final UserProfileController _profileController =
      Get.put(UserProfileController());

  UserProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: RefreshIndicator(
        key: _profileController.refreshIndicatorKey,
        onRefresh: () async => await _profileController.fetchProfile(),
        child: GetBuilder<UserProfileController>(
          builder: (controller) => SingleChildScrollView(
            child: Column(
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    ProfileBackgroundContainer(
                      child: controller.user.photo == null
                          ? Icon(
                              Icons.person,
                              size: 50,
                              color: Colors.lightBlue.shade900,
                            )
                          : Image.network(
                              'http://192.168.0.101:8000/api/image/${controller.user.photo}',
                              errorBuilder: (context, error, stackTrace) {
                                return Text(error.toString());
                              },
                              height: 100,
                              width: 100,
                              headers: const {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'image/*; charset=UTF-8',
                                'Accept': 'image/*',
                                'Connection': 'Keep-Alive',
                              },
                            ),
                      onPressed: () => Dialogs().addPhotoDialog(
                        () async {
                          await controller.takePhotoFromCamera();
                        },
                        () async {
                          await controller.pickPhotoFromGallery();
                        },
                        () {},
                      ),
                    ),
                  ],
                ),
                HeadlineText(text: controller.user.name),
                const HeadlineText(text: 'Rating:'),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: InfoWithEditContainer(
                    name: 'Bio:',
                    buttonText: 'Edit',
                    icon: Icons.edit,
                    widget: BodyText(
                      text: '${controller.user.description}',
                    ),
                    onPressed: () => Dialogs().addBioDialog(
                      controller.editBioController,
                      () {
                        controller.editBio(controller.editBioController.text);
                        controller.refreshIndicatorKey.currentState!.show();
                      },
                    ),
                  ),
                ),
                Column(
                  children: [
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
                                const BodyText(text: 'Email: '),
                                LabelText(text: controller.user.email),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Phone Number: '),
                                LabelText(text: controller.user.phoneNumber),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Location: '),
                                LabelText(
                                    text:
                                        '${controller.user.state} - ${controller.user.country}'),
                              ],
                            ),
                            Row(
                              children: [
                                Row(
                                  children: [
                                    const BodyText(text: 'Gender: '),
                                    LabelText(text: controller.user.gender),
                                  ],
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                  child: Row(
                                    children: [
                                      const BodyText(text: 'Birthdate: '),
                                      LabelText(
                                        text: controller.user.birthDate,
                                      )
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        onPressed: () => Get.toNamed('/userEditInfo'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Education',
                        buttonText: 'Edit',
                        icon: Icons.edit,
                        widget: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const BodyText(text: 'Level: '),
                                LabelText(text: controller.user.education.level)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Field: '),
                                LabelText(text: controller.user.education.field)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'School: '),
                                LabelText(
                                    text: controller.user.education.school)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Start Date: '),
                                LabelText(
                                    text: controller.user.education.startDate)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'End Date: '),
                                LabelText(
                                    text: controller.user.education.endDate)
                              ],
                            ),
                          ],
                        ),
                        onPressed: () => Get.toNamed('/userEditEducation'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Skills',
                        buttonText: 'Edit',
                        icon: Icons.edit,
                        widget: ListView.builder(
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: (_profileController.user.skills.length / 2)
                              .ceil(),
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            final firstIndex = index * 2;
                            final secondIndex = firstIndex + 1;
                            return Row(
                              children: [
                                if (firstIndex <
                                    _profileController.user.skills.length)
                                  Expanded(
                                    flex: 1,
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: Chip(
                                        label: BodyText(
                                          text: _profileController
                                              .user.skills[firstIndex].name,
                                        ),
                                      ),
                                    ),
                                  ),
                                if (secondIndex <
                                    _profileController.user.skills.length)
                                  Expanded(
                                    flex: 1,
                                    child: Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: Chip(
                                        label: BodyText(
                                          text: _profileController
                                              .user.skills[secondIndex].name,
                                        ),
                                      ),
                                    ),
                                  ),
                              ],
                            );
                          },
                        ),
                        onPressed: () {
                          Get.toNamed('/userEditSkills');
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Certificates',
                        buttonText: 'View',
                        widget: ListView.builder(
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: controller.user.certificates!.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.all(10),
                              child: ListContainer(
                                child: BodyText(
                                  text:
                                      controller.user.certificates![index].name,
                                ),
                                onTap: () => controller.fetchFile(
                                    controller.user.certificates![index].file),
                              ),
                            );
                          },
                        ),
                        onPressed: () => Get.toNamed('/userEditCertificates'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Portofolios',
                        buttonText: 'View',
                        widget: const Column(),
                        onPressed: () {},
                      ),
                    ),
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
