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
      body: FutureBuilder(
        future: _profileController.fetchProfile(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: HeadlineText(text: 'Error: ${snapshot.error}'),
            );
          } else {
            return RefreshIndicator(
              key: _profileController.refreshIndicatorKey,
              onRefresh: () async => await _profileController.fetchProfile(),
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    const Stack(
                      alignment: Alignment.center,
                      children: [
                        ProfileBackgroundContainer(),
                        ProfilePhotoContainer(),
                      ],
                    ),
                    HeadlineText(text: _profileController.user.name),
                    const HeadlineText(text: 'Rating:'),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () {
                            Dialogs().addBioDialog(
                              _profileController.editBioController,
                              () {
                                _profileController.editBio(
                                    _profileController.editBioController.text);
                                _profileController
                                    .refreshIndicatorKey.currentState!
                                    .show();
                              },
                            );
                          },
                          icon: Icon(
                            Icons.edit,
                            color: Colors.orange.shade800,
                          ),
                        ),
                        GetBuilder<UserProfileController>(
                          builder: (controller) => HeadlineText(
                            text: 'Bio: ${controller.user.description}',
                          ),
                        )
                      ],
                    ),
                    Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoWithEditContainer(
                            name: 'Basic Info',
                            buttonText: 'Edit',
                            icon: Icons.edit,
                            height: 160,
                            widget: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const BodyText(text: 'Email: '),
                                    LabelText(
                                        text: _profileController.user.email),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Phone Number: '),
                                    LabelText(
                                        text: _profileController
                                            .user.phoneNumber),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Location: '),
                                    LabelText(
                                        text:
                                            '${_profileController.user.state} - ${_profileController.user.country}'),
                                  ],
                                ),
                                Row(
                                  children: [
                                    Row(
                                      children: [
                                        const BodyText(text: 'Gender: '),
                                        LabelText(
                                            text:
                                                _profileController.user.gender),
                                      ],
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.fromLTRB(
                                          10, 0, 0, 0),
                                      child: Row(
                                        children: [
                                          const BodyText(text: 'Birthdate: '),
                                          LabelText(
                                              text: _profileController
                                                  .user.birthDate)
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
                            height: 160,
                            widget: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const BodyText(text: 'Level: '),
                                    LabelText(
                                        text: _profileController
                                            .user.education.level)
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Field: '),
                                    LabelText(
                                        text: _profileController
                                            .user.education.field)
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'School: '),
                                    LabelText(
                                        text: _profileController
                                            .user.education.school)
                                  ],
                                ),
                                Row(
                                  children: [
                                    Row(
                                      children: [
                                        const BodyText(text: 'Start Date: '),
                                        LabelText(
                                            text: _profileController
                                                .user.education.startDate),
                                      ],
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.fromLTRB(
                                          10, 0, 0, 0),
                                      child: Row(
                                        children: [
                                          const BodyText(text: 'End Date: '),
                                          LabelText(
                                              text: _profileController
                                                  .user.education.endDate),
                                        ],
                                      ),
                                    ),
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
                            height: null,
                            widget: GridView.builder(
                              itemCount: _profileController.user.skills.length,
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 3,
                                mainAxisSpacing: 5,
                                crossAxisSpacing: 5,
                                childAspectRatio: 1.0,
                              ),
                              shrinkWrap: true,
                              itemBuilder: (context, index) => Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Chip(
                                    label: LabelText(
                                        text: _profileController
                                            .user.skills[index].name),
                                  ),
                                ],
                              ),
                            ),
                            onPressed: () {},
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: InfoWithEditContainer(
                            name: 'Certificates',
                            buttonText: 'Add',
                            icon: Icons.add,
                            height: 160,
                            widget: const Column(),
                            onPressed: () {},
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
                    ),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
