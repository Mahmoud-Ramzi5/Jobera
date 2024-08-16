import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/manage/manage_bookmarks_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class ManageBookmarksView extends StatelessWidget {
  final ManageBookmarksController _manageBookmarksController =
      Get.put(ManageBookmarksController());

  ManageBookmarksView({super.key});

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      key: _manageBookmarksController.refreshIndicatorKey,
      onRefresh: () async => await _manageBookmarksController.refreshView(),
      child: GetBuilder<ManageBookmarksController>(
        builder: (controller) => Scaffold(
          body: controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  controller: controller.scrollController,
                  child: Column(
                    children: [
                      Column(
                        children: [
                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: controller.bookmarks.length,
                            physics: const NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return GestureDetector(
                                onTap: () {
                                  if (controller.bookmarks[index].type ==
                                      'Freelancing') {
                                    controller.viewFreelancingJob(
                                      controller.bookmarks[index].defJobId,
                                    );
                                  } else {
                                    controller.viewRegularJob(
                                      controller.bookmarks[index].defJobId,
                                    );
                                  }
                                },
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
                                    child: controller.bookmarks[index].type ==
                                            'Freelancing'
                                        ? FreelancingJobComponent(
                                            photo: controller
                                                .bookmarks[index].photo,
                                            jobTitle: controller
                                                .bookmarks[index].title,
                                            jobType: controller
                                                .bookmarks[index].type,
                                            publishedBy: controller
                                                .bookmarks[index].poster.name,
                                            publishDate: controller
                                                .bookmarks[index].publishDate,
                                            deadline: controller
                                                .bookmarks[index].deadline,
                                            minOffer: controller
                                                .bookmarks[index].minOffer,
                                            maxOffer: controller
                                                .bookmarks[index].maxOffer,
                                            isFlagged: controller
                                                .bookmarks[index].isFlagged,
                                            onPressed: () async =>
                                                await controller.bookmarkJob(
                                              controller
                                                  .bookmarks[index].defJobId,
                                            ),
                                          )
                                        : RegularJobComponent(
                                            photo: controller
                                                .bookmarks[index].photo,
                                            jobTitle: controller
                                                .bookmarks[index].title,
                                            jobType: controller
                                                .bookmarks[index].type,
                                            publishedBy: controller
                                                .bookmarks[index].poster.name,
                                            date: controller
                                                .bookmarks[index].publishDate,
                                            salary: controller
                                                .bookmarks[index].salary,
                                            isFlagged: controller
                                                .bookmarks[index].isFlagged,
                                            onPressed: () async =>
                                                await controller.bookmarkJob(
                                              controller
                                                  .bookmarks[index].defJobId,
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
                      ),
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
