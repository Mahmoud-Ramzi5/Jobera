import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/homeControllers/home_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class UserProfileView extends StatelessWidget {
  final HomeController controller = Get.find<HomeController>();

  UserProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Column(
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
                  HeadlineText(text: controller.user!.name),
                  const HeadlineText(text: 'Rating:'),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.edit,
                          color: Colors.orange.shade800,
                        ),
                      ),
                      HeadlineText(
                          text: 'Bio: ${controller.user!.description}'),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Basic Info',
                      height: 160,
                      widget: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const BodyText(text: 'Email: '),
                              LabelText(text: controller.user!.email),
                            ],
                          ),
                          Row(
                            children: [
                              const BodyText(text: 'Location: '),
                              LabelText(
                                  text:
                                      '${controller.user!.state}-${controller.user!.country}'),
                            ],
                          ),
                          Row(
                            children: [
                              const BodyText(text: 'Phone Number: '),
                              LabelText(text: controller.user!.phoneNumber),
                            ],
                          ),
                          Row(
                            children: [
                              Row(
                                children: [
                                  const BodyText(text: 'Gender: '),
                                  LabelText(text: controller.user!.gender),
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                child: Row(
                                  children: [
                                    const BodyText(text: 'Birthdate: '),
                                    LabelText(text: controller.user!.birthDate)
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Education',
                      height: 160,
                      widget: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const BodyText(text: 'Level: '),
                              LabelText(text: controller.user!.education.level)
                            ],
                          ),
                          Row(
                            children: [
                              const BodyText(text: 'Field: '),
                              LabelText(text: controller.user!.education.field)
                            ],
                          ),
                          Row(
                            children: [
                              const BodyText(text: 'School: '),
                              LabelText(text: controller.user!.education.school)
                            ],
                          ),
                          Row(
                            children: [
                              Row(
                                children: [
                                  const BodyText(text: 'Start Date: '),
                                  LabelText(
                                      text:
                                          controller.user!.education.startDate)
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                child: Row(
                                  children: [
                                    const BodyText(text: 'End Date: '),
                                    LabelText(
                                        text:
                                            controller.user!.education.endDate)
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Skills',
                      height: null,
                      widget: GridView.builder(
                        itemCount: controller.user!.skills.length,
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
                                  text: controller.user!.skills[index].name),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Certificates',
                      height: 160,
                      widget: Column(),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Portofolios',
                      height: 160,
                      widget: Column(),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
