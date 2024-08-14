import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobsView extends StatelessWidget {
  final RegularJobsController _regularJobController =
      Get.put(RegularJobsController());

  RegularJobsView({super.key});

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      key: _regularJobController.refreshIndicatorKey,
      onRefresh: () async => _regularJobController.refreshView(),
      child: GetBuilder<RegularJobsController>(
        builder: (controller) => Scaffold(
          body: controller.loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : SingleChildScrollView(
                  controller: controller.scrollController,
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          IconButton(
                            onPressed: () => Get.toNamed('/regularJobsFilter'),
                            icon: const Icon(Icons.filter_alt),
                            color: Colors.lightBlue.shade900,
                          ),
                        ],
                      ),
                      ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.regularJobs.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () => controller.viewDetails(
                              controller.regularJobs[index],
                            ),
                            child: Card(
                              margin: const EdgeInsets.all(10),
                              shape: RoundedRectangleBorder(
                                borderRadius: const BorderRadius.all(
                                  Radius.circular(10),
                                ),
                                side: BorderSide(
                                  color: controller.regularJobs[index].type ==
                                          'FullTime'
                                      ? Colors.lightBlue.shade900
                                      : Colors.orange.shade800,
                                  width: 2,
                                ),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(10),
                                child: RegularJobComponent(
                                  photo: controller.regularJobs[index].photo,
                                  jobTitle: controller.regularJobs[index].title,
                                  jobType: controller.regularJobs[index].type,
                                  publishedBy:
                                      controller.regularJobs[index].poster.name,
                                  date:
                                      controller.regularJobs[index].publishDate,
                                  salary: controller.regularJobs[index].salary,
                                  onPressed: () {},
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
                                child: Center(
                                  child: BodyText(
                                    text: controller.regularJobs.isEmpty
                                        ? '111'.tr
                                        : '112'.tr,
                                  ),
                                ),
                              ),
                            )
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
