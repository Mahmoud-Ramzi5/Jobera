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
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: InfoWithEditContainer(
                      name: 'Basic Info',
                      height: 170,
                      widget: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          BodyText(text: 'Email: ${controller.user!.email}'),
                          BodyText(
                              text:
                                  'Location: ${controller.user!.state}-${controller.user!.country}'),
                          BodyText(
                              text:
                                  'Phone Number: ${controller.user!.phoneNumber}'),
                          Row(
                            children: [
                              BodyText(
                                  text: 'Gender: ${controller.user!.gender}'),
                              Padding(
                                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                child: BodyText(
                                    text:
                                        'Birthdate: ${controller.user!.birthDate}'),
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
                      height: 170,
                      widget: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          BodyText(
                              text:
                                  'Level: ${controller.user!.education.level}'),
                          BodyText(
                              text:
                                  'Field: ${controller.user!.education.field}'),
                          BodyText(
                              text:
                                  'School: ${controller.user!.education.school}'),
                          Row(
                            children: [
                              BodyText(
                                  text:
                                      'Start Date: ${controller.user!.education.startDate}'),
                              Padding(
                                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                child: BodyText(
                                    text:
                                        'End Date: ${controller.user!.education.endDate}'),
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
                      height: 140,
                      widget: SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ListView.builder(
                              itemCount: controller.user!.skills.length,
                              shrinkWrap: true,
                              itemBuilder: (context, index) => Row(
                                children: [
                                  BodyText(
                                    text:
                                        'skill: ${controller.user!.skills[index].name}',
                                  ),
                                  Padding(
                                    padding:
                                        const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                    child: BodyText(
                                      text:
                                          'Type: ${controller.user!.skills[index].type}',
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
