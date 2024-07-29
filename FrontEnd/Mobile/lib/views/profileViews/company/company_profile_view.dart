import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/profile_components.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';

class CompanyProfileView extends StatelessWidget {
  final CompanyProfileController _companyProfileController =
      Get.put(CompanyProfileController());

  CompanyProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => _companyProfileController.goBack(),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: RefreshIndicator(
        key: _companyProfileController.refreshIndicatorKey,
        onRefresh: () async => await _companyProfileController.fetchProfile(),
        child: GetBuilder<CompanyProfileController>(
          builder: (controller) => controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      ProfileBackgroundContainer(
                        onPressed: controller.homeController.isOtherUserProfile
                            ? null
                            : () => Dialogs().addPhotoDialog(
                                  () async {
                                    controller.image = await controller
                                        .settingsController
                                        .takePhotoFromCamera();
                                    controller.addPhoto();
                                  },
                                  () async {
                                    controller.image = await controller
                                        .settingsController
                                        .pickPhotoFromGallery();
                                    controller.addPhoto();
                                  },
                                  () async => await controller.removePhoto(),
                                ),
                        child: controller.company.photo == null
                            ? Icon(
                                Icons.business,
                                size: 100,
                                color: Colors.lightBlue.shade900,
                              )
                            : CustomImage(
                                path: controller.company.photo.toString(),
                              ),
                      ),
                      SmallHeadlineText(text: controller.company.name),
                      const SmallHeadlineText(text: 'Rating:'),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: 'Bio',
                          buttonText:
                              controller.homeController.isOtherUserProfile
                                  ? null
                                  : 'Edit',
                          icon: Icons.edit,
                          widget: BodyText(
                            text: controller.company.description != null
                                ? '${controller.company.description}'
                                : '',
                          ),
                          onPressed: () {
                            Dialogs().addBioDialog(
                              controller.editBioController,
                              controller.company.description,
                              () => controller
                                  .editBio(controller.editBioController.text),
                            );
                          },
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: 'Basic Info',
                          buttonText:
                              controller.homeController.isOtherUserProfile
                                  ? null
                                  : 'Edit',
                          icon: Icons.edit,
                          widget: CompanyBasicInfoComponent(
                            isOtherUserProfile:
                                controller.homeController.isOtherUserProfile,
                            field: controller.company.field,
                            email: controller.company.email,
                            phoneNumber: controller.company.phoneNumber,
                            state: controller.company.state,
                            country: controller.company.country,
                            date: controller.company.foundingDate,
                          ),
                          onPressed: () {
                            Get.toNamed('/companyEditInfo');
                          },
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: 'Portfolios',
                          buttonText: 'View',
                          widget: GridView.builder(
                            gridDelegate:
                                const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                            ),
                            itemCount: controller.company.portfolios.length,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return PortfolioComponent(
                                photo:
                                    controller.company.portfolios[index].photo,
                                title:
                                    controller.company.portfolios[index].title,
                              );
                            },
                          ),
                          onPressed: () => Get.toNamed('/viewPortfolios'),
                        ),
                      ),
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
