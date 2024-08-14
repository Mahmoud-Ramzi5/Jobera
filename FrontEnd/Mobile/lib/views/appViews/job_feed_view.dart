import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/job_feed_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/texts.dart';

class JobFeedView extends StatelessWidget {
  final JobFeedController newsFeedController = Get.put(JobFeedController());

  JobFeedView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GetBuilder<JobFeedController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: NewsFeedContainer(
                        width: Get.width - 10,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: MediumHeadlineText(
                                text: '86'.tr,
                              ),
                            ),
                            ListView.builder(
                              itemCount:
                                  controller.mostPayedFreeLancingJobs.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: SizedBox(
                                    width: 100,
                                    child: GestureDetector(
                                      onTap: () =>
                                          controller.viewFreelancingJob(
                                        controller
                                            .mostPayedFreeLancingJobs[index].id,
                                      ),
                                      child: Card(
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              SmallHeadlineText(
                                                text: controller
                                                    .mostPayedFreeLancingJobs[
                                                        index]
                                                    .title,
                                              ),
                                              Row(
                                                children: [
                                                  SmallHeadlineText(
                                                    text: '89'.tr,
                                                  ),
                                                  MediumHeadlineText(
                                                    text:
                                                        '${controller.mostPayedFreeLancingJobs[index].salary}\$',
                                                  )
                                                ],
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: NewsFeedContainer(
                        width: Get.width - 10,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: MediumHeadlineText(
                                text: '88'.tr,
                              ),
                            ),
                            ListView.builder(
                              itemCount: controller.mostPayedRegJobs.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: SizedBox(
                                    width: 100,
                                    child: GestureDetector(
                                      onTap: () => controller.viewRegularJob(
                                        controller.mostPayedRegJobs[index].id,
                                      ),
                                      child: Card(
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              SmallHeadlineText(
                                                text: controller
                                                    .mostPayedRegJobs[index]
                                                    .title,
                                              ),
                                              Row(
                                                children: [
                                                  SmallHeadlineText(
                                                    text: '87'.tr,
                                                  ),
                                                  MediumHeadlineText(
                                                    text:
                                                        '${controller.mostPayedRegJobs[index].salary}\$',
                                                  )
                                                ],
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: NewsFeedContainer(
                        width: Get.width - 10,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: MediumHeadlineText(
                                text: '90'.tr,
                              ),
                            ),
                            ListView.builder(
                              itemCount: controller.mostPostingComapnies.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: SizedBox(
                                    width: 100,
                                    child: GestureDetector(
                                      onTap: () =>
                                          controller.viewCompanyProfile(
                                        controller
                                            .mostPostingComapnies[index].id,
                                        controller
                                            .mostPostingComapnies[index].title,
                                      ),
                                      child: Card(
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              SmallHeadlineText(
                                                  text: controller
                                                      .mostPostingComapnies[
                                                          index]
                                                      .title),
                                              Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceEvenly,
                                                children: [
                                                  MediumHeadlineText(
                                                    text:
                                                        '${controller.mostPostingComapnies[index].count}',
                                                  ),
                                                  SmallHeadlineText(
                                                    text: '91'.tr,
                                                  ),
                                                ],
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: NewsFeedContainer(
                        width: Get.width - 10,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: MediumHeadlineText(
                                text: '92'.tr,
                              ),
                            ),
                            ListView.builder(
                              itemCount: controller.mostNeededSkills.length,
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: SizedBox(
                                    width: 100,
                                    child: Card(
                                      child: Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            SmallHeadlineText(
                                              text: controller
                                                  .mostNeededSkills[index]
                                                  .title,
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.spaceEvenly,
                                              children: [
                                                MediumHeadlineText(
                                                  text:
                                                      '${controller.mostNeededSkills[index].count}',
                                                ),
                                                SmallHeadlineText(
                                                  text: '93'.tr,
                                                ),
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.stats.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          final firstIndex = index * 2;
                          final secondIndex = firstIndex + 1;
                          return Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              if (firstIndex < controller.stats.length)
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: NewsFeedContainer(
                                    height: 150,
                                    width: 150,
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        SmallHeadlineText(
                                          text:
                                              '${controller.stats[firstIndex].stat}',
                                        ),
                                        LabelText(
                                          text:
                                              controller.stats[firstIndex].name,
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              if (secondIndex < controller.stats.length)
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: NewsFeedContainer(
                                    height: 150,
                                    width: 150,
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        SmallHeadlineText(
                                          text:
                                              '${controller.stats[secondIndex].stat}',
                                        ),
                                        LabelText(
                                          text: controller
                                              .stats[secondIndex].name,
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                            ],
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
