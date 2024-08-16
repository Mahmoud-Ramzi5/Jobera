import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/manage/manage_posts_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class ManagePostsView extends StatelessWidget {
  final ManagePostsController _managePostsController =
      Get.put(ManagePostsController());

  ManagePostsView({super.key});

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      key: _managePostsController.refreshIndicatorKey,
      onRefresh: () async => await _managePostsController.refreshView(),
      child: GetBuilder<ManagePostsController>(
        builder: (controller) => Scaffold(
          body: controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  controller: controller.scrollController,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            OutlinedButton(
                              onPressed: () async =>
                                  controller.getFreelancingPosts(),
                              child: BodyText(text: '99'.tr),
                            ),
                            if (controller.homeController.isCompany)
                              OutlinedButton(
                                onPressed: () async =>
                                    controller.getRegularPosts(),
                                child: BodyText(text: '98'.tr),
                              ),
                          ],
                        ),
                      ),
                      controller.postType == 'Freelancing'
                          ? Column(
                              children: [
                                ListView.builder(
                                  shrinkWrap: true,
                                  itemCount: controller.freelancingPosts.length,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemBuilder: (context, index) {
                                    return GestureDetector(
                                      onTap: () =>
                                          controller.viewFreelancingJob(
                                        controller
                                            .freelancingPosts[index].defJobId,
                                      ),
                                      child: Card(
                                        margin: const EdgeInsets.all(10),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(10),
                                          ),
                                          side: BorderSide(
                                            color: Colors.lightBlue.shade900,
                                            width: 2,
                                          ),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: FreelancingJobComponent(
                                            photo: controller
                                                .freelancingPosts[index].photo,
                                            jobTitle: controller
                                                .freelancingPosts[index].title,
                                            jobType: controller
                                                .freelancingPosts[index].type,
                                            publishedBy: controller
                                                .freelancingPosts[index]
                                                .poster
                                                .name,
                                            publishDate: controller
                                                .freelancingPosts[index]
                                                .publishDate,
                                            deadline: controller
                                                .freelancingPosts[index]
                                                .deadline,
                                            minOffer: controller
                                                .freelancingPosts[index]
                                                .minOffer,
                                            maxOffer: controller
                                                .freelancingPosts[index]
                                                .maxOffer,
                                            isFlagged: controller
                                                .freelancingPosts[index]
                                                .isFlagged,
                                            onPressed: () async =>
                                                await controller.bookmarkJob(
                                              controller.freelancingPosts[index]
                                                  .defJobId,
                                            ),
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                controller.paginationData.hasMorePages
                                    ? const Center(
                                        child: CircularProgressIndicator(),
                                      )
                                    : SingleChildScrollView(
                                        child: SizedBox(
                                          height: Get.height,
                                          child: BodyText(
                                            text: '112'.tr,
                                          ),
                                        ),
                                      )
                              ],
                            )
                          : Column(
                              children: [
                                ListView.builder(
                                  shrinkWrap: true,
                                  itemCount: controller.regularPosts.length,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemBuilder: (context, index) {
                                    return GestureDetector(
                                      onTap: () => controller.viewRegularJob(
                                        controller.regularPosts[index].defJobId,
                                      ),
                                      child: Card(
                                        margin: const EdgeInsets.all(10),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(10),
                                          ),
                                          side: BorderSide(
                                            color: controller
                                                        .regularPosts[index]
                                                        .type ==
                                                    'FullTime'
                                                ? Colors.lightBlue.shade900
                                                : Colors.orange.shade800,
                                            width: 2,
                                          ),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: RegularJobComponent(
                                            photo: controller
                                                .regularPosts[index].photo,
                                            jobTitle: controller
                                                .regularPosts[index].title,
                                            jobType: controller
                                                .regularPosts[index].type,
                                            publishedBy: controller
                                                .regularPosts[index]
                                                .poster
                                                .name,
                                            date: controller.regularPosts[index]
                                                .publishDate,
                                            salary: controller
                                                .regularPosts[index].salary,
                                            isFlagged: controller
                                                .regularPosts[index].isFlagged,
                                            onPressed: () async =>
                                                await controller.bookmarkJob(
                                              controller
                                                  .regularPosts[index].defJobId,
                                            ),
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                controller.paginationData.hasMorePages
                                    ? const Center(
                                        child: CircularProgressIndicator(),
                                      )
                                    : SingleChildScrollView(
                                        child: SizedBox(
                                          height: Get.height,
                                          child: BodyText(
                                            text: '112'.tr,
                                          ),
                                        ),
                                      )
                              ],
                            )
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
