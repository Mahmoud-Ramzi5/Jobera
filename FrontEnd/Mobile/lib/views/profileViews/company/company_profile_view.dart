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
                    Column(
                      children: [
                        HeadlineText(text: _profileController.company.name),
                        const HeadlineText(text: 'Rating:'),
                        Row(
                          children: [
                            IconButton(
                              onPressed: () {
                                Dialogs().addBioDialog(
                                  _profileController.editBioController,
                                  () {
                                    _profileController.editBio(
                                        _profileController
                                            .editBioController.text);
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
                            GetBuilder<CompanyProfileController>(
                              builder: (controller) => HeadlineText(
                                  text:
                                      'Bio: ${controller.company.description}'),
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
                                    LabelText(
                                        text: _profileController.company.field),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Email: '),
                                    LabelText(
                                        text: _profileController.company.email),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Phone Number: '),
                                    LabelText(
                                        text: _profileController
                                            .company.phoneNumber),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Location: '),
                                    LabelText(
                                        text:
                                            '${_profileController.company.state} - ${_profileController.company.country}'),
                                  ],
                                ),
                                Row(
                                  children: [
                                    const BodyText(text: 'Founding Date: '),
                                    LabelText(
                                        text: _profileController
                                            .company.foundingDate)
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
            );
          }
        },
      ),
    );
  }
}
