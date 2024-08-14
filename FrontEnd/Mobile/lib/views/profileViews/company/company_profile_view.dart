import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SmallHeadlineText(text: '24'.tr),
                          RatingBar.builder(
                            initialRating: controller.company.rating ?? 0.0,
                            allowHalfRating: true,
                            itemCount: 5,
                            itemBuilder: (context, index) {
                              return Icon(
                                Icons.star,
                                color: Colors.lightBlue.shade900,
                              );
                            },
                            itemSize: 30,
                            ignoreGestures: true,
                            onRatingUpdate: (value) {},
                          ),
                          BodyText(
                            text:
                                '(${controller.company.reviewsCount} ${'25'.tr})',
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: '26'.tr,
                          buttonText:
                              controller.homeController.isOtherUserProfile
                                  ? null
                                  : '27'.tr,
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
                          name: '28'.tr,
                          buttonText:
                              controller.homeController.isOtherUserProfile
                                  ? null
                                  : '27'.tr,
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
                          name: '33'.tr,
                          buttonText: '32'.tr,
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
