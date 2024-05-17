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
      body: FutureBuilder(
        future: _profileController.fetchProfile(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // While the future is still loading
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            // If an error occurred during the future execution
            return Center(
              child: HeadlineText(text: 'Error: ${snapshot.error}'),
            );
          } else {
            // If the future completed successfully
            return Column(
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
                      HeadlineText(text: _profileController.company.name),
                      const HeadlineText(text: 'Rating:'),
                      Row(
                        children: [
                          IconButton(
                            onPressed: () {
                              Dialogs().addBioDialog(
                                _profileController.company.description,
                                () {},
                              );
                            },
                            icon: Icon(
                              Icons.edit,
                              color: Colors.orange.shade800,
                            ),
                          ),
                          HeadlineText(
                              text:
                                  'Bio: ${_profileController.company.description}'),
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
                          onPressed: () {},
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoWithEditContainer(
                          name: 'Portofolios',
                          height: 160,
                          widget: const Column(),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                )
              ],
            );
          }
        },
      ),
    );
  }
}
