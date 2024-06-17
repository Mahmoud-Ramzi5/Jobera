import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

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
                              size: 100,
                              color: Colors.lightBlue.shade900,
                            )
                          : CustomImage(
                              path: controller.user.photo.toString(),
                            ),
                      onPressed: () => Dialogs().addPhotoDialog(
                        () async {
                          controller.image = await controller.generalController
                              .takePhotoFromCamera();
                          controller.addPhoto();
                        },
                        () async {
                          controller.image = await controller.generalController
                              .pickPhotoFromGallery();
                          controller.addPhoto();
                        },
                        () => controller.removePhoto(),
                      ),
                    ),
                  ],
                ),
                HeadlineText(text: controller.user.name),
                const HeadlineText(text: 'Rating:'),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: InfoWithEditContainer(
                    name: 'Bio',
                    buttonText: 'Edit',
                    icon: Icons.edit,
                    widget: BodyText(
                      text: controller.user.description != null
                          ? '${controller.user.description}'
                          : '',
                    ),
                    onPressed: () => Dialogs().addBioDialog(
                      controller.editBioController,
                      () =>
                          controller.editBio(controller.editBioController.text),
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
                                    LabelText(
                                      text:
                                          controller.user.gender.toLowerCase(),
                                    ),
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
                                LabelText(
                                  text: controller.user.education!.level
                                      .replaceAllMapped('_', (match) => ' '),
                                )
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Field: '),
                                LabelText(
                                    text: controller.user.education!.field)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'School: '),
                                LabelText(
                                    text: controller.user.education!.school)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Start Date: '),
                                LabelText(
                                    text: controller.user.education!.startDate)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'End Date: '),
                                LabelText(
                                    text: controller.user.education!.endDate)
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Certificate: '),
                                Flexible(
                                  flex: 1,
                                  child: LabelText(
                                    text: controller.user.education!
                                                .certificateFile !=
                                            null
                                        ? controller
                                            .user.education!.certificateFile!
                                            .split('/')
                                            .last
                                        : 'No File',
                                  ),
                                ),
                                IconButton(
                                  onPressed: () {
                                    if (controller
                                            .user.education!.certificateFile !=
                                        null) {
                                      controller.generalController.fetchFile(
                                        controller
                                            .user.education!.certificateFile
                                            .toString(),
                                        'education',
                                      );
                                    }
                                  },
                                  icon: Icon(
                                    Icons.file_open,
                                    color: Colors.lightBlue.shade900,
                                  ),
                                )
                              ],
                            )
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
                          itemCount: controller.user.certificates.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.all(10),
                              child: ListContainer(
                                child: BodyText(
                                  text:
                                      controller.user.certificates[index].name,
                                ),
                              ),
                            );
                          },
                        ),
                        onPressed: () => Get.toNamed('/userViewCertificates'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: InfoWithEditContainer(
                        name: 'Portofolios',
                        buttonText: 'View',
                        widget: GridView.builder(
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: 2),
                          itemCount: controller.user.portofolios.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.all(10),
                              child: ListContainer(
                                child: Column(
                                  children: [
                                    controller.user.portofolios[index].photo ==
                                            null
                                        ? Icon(
                                            Icons.photo,
                                            color: Colors.lightBlue.shade900,
                                            size: 100,
                                          )
                                        : CustomImage(
                                            path: controller
                                                .user.portofolios[index].photo
                                                .toString(),
                                            height: 100,
                                          ),
                                    LabelText(
                                      text: controller
                                          .user.portofolios[index].title,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                        onPressed: () {
                          Get.toNamed('/viewPortfolios');
                        },
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
