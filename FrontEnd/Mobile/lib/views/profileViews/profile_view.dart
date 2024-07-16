import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/profileControllers/profile_controller.dart';
import 'package:jobera/customWidgets/components.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';

class ProfileView extends StatelessWidget {
  final ProfileController _profileController = Get.put(ProfileController());

  ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => _profileController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _profileController.refreshIndicatorKey,
        onRefresh: () async => await _profileController.fetchProfile(),
        child: GetBuilder<ProfileController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
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
                                controller.image = await controller
                                    .generalController
                                    .takePhotoFromCamera();
                                controller.addPhoto();
                              },
                              () async {
                                controller.image = await controller
                                    .generalController
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
                            () => controller
                                .editBio(controller.editBioController.text),
                          ),
                        ),
                      ),
                      Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: InfoWithEditContainer(
                              name: 'Basic Info:',
                              buttonText: 'Edit',
                              icon: Icons.edit,
                              widget: BasicInfoComponent(
                                isCompany: controller.homeController.isCompany,
                                fieldOrGender:
                                    controller.homeController.isCompany
                                        ? controller.user.field
                                        : controller.user.gender,
                                email: controller.user.email,
                                phoneNumber: controller.user.phoneNumber,
                                state: controller.user.state,
                                country: controller.user.country,
                                date: controller.homeController.isCompany
                                    ? controller.user.foundingDate
                                    : controller.user.birthDate,
                              ),
                              onPressed: () {
                                if (controller.homeController.isCompany) {
                                  Get.toNamed('/companyEditInfo');
                                } else {
                                  Get.toNamed('/userEditInfo');
                                }
                              },
                            ),
                          ),
                          if (!controller.homeController.isCompany)
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoWithEditContainer(
                                name: 'Education',
                                buttonText: 'Edit',
                                icon: Icons.edit,
                                widget: EducationComponent(
                                  level: controller.user.education.level,
                                  field: controller.user.education.field,
                                  school: controller.user.education.school,
                                  startDate:
                                      controller.user.education.startDate,
                                  endDate: controller.user.education.endDate,
                                  certificate:
                                      controller.user.education.certificateFile,
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
                                ),
                                onPressed: () =>
                                    Get.toNamed('/userEditEducation'),
                              ),
                            ),
                          if (!controller.homeController.isCompany)
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoWithEditContainer(
                                name: 'Skills',
                                buttonText: 'Edit',
                                icon: Icons.edit,
                                widget: ListView.builder(
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount: controller.user.skills.length,
                                  shrinkWrap: true,
                                  itemBuilder: (context, index) {
                                    final firstIndex = index * 2;
                                    final secondIndex = firstIndex + 1;
                                    return Row(
                                      children: [
                                        if (firstIndex <
                                            controller.user.skills.length)
                                          Expanded(
                                            flex: 1,
                                            child: Padding(
                                              padding: const EdgeInsets.all(5),
                                              child: Chip(
                                                label: BodyText(
                                                  text: controller.user
                                                      .skills[firstIndex].name,
                                                ),
                                              ),
                                            ),
                                          ),
                                        if (secondIndex <
                                            controller.user.skills.length)
                                          Expanded(
                                            flex: 1,
                                            child: Padding(
                                              padding: const EdgeInsets.all(5),
                                              child: Chip(
                                                label: BodyText(
                                                  text: controller.user
                                                      .skills[secondIndex].name,
                                                ),
                                              ),
                                            ),
                                          ),
                                      ],
                                    );
                                  },
                                ),
                                onPressed: () => Get.toNamed('/userEditSkills'),
                              ),
                            ),
                          if (!controller.homeController.isCompany)
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoWithEditContainer(
                                name: 'Certificates',
                                buttonText: 'View',
                                widget: ListView.builder(
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount:
                                      controller.user.certificates.length,
                                  shrinkWrap: true,
                                  itemBuilder: (context, index) {
                                    return Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: ListContainer(
                                        child: BodyText(
                                          text: controller
                                              .user.certificates[index].name,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                onPressed: () =>
                                    Get.toNamed('/userViewCertificates'),
                              ),
                            ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: InfoWithEditContainer(
                              name: 'Portfolios',
                              buttonText: 'View',
                              widget: GridView.builder(
                                gridDelegate:
                                    const SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: 2,
                                ),
                                itemCount: controller.user.portfolios.length,
                                shrinkWrap: true,
                                itemBuilder: (context, index) {
                                  return Padding(
                                    padding: const EdgeInsets.all(10),
                                    child: ListContainer(
                                      child: Column(
                                        children: [
                                          controller.user.portfolios[index]
                                                      .photo ==
                                                  null
                                              ? Icon(
                                                  Icons.photo,
                                                  color:
                                                      Colors.lightBlue.shade900,
                                                  size: 100,
                                                )
                                              : CustomImage(
                                                  path: controller.user
                                                      .portfolios[index].photo
                                                      .toString(),
                                                  height: 100,
                                                ),
                                          LabelText(
                                            text: controller
                                                .user.portfolios[index].title,
                                          ),
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                              onPressed: () => Get.toNamed('/viewPortfolios'),
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
