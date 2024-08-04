import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class FreelancingJobsView extends StatelessWidget {
  final FreelancingJobsController _freelancingJobsController =
      Get.put(FreelancingJobsController());

  FreelancingJobsView({super.key});

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      key: _freelancingJobsController.refreshIndicatorKey,
      onRefresh: () async => await _freelancingJobsController.refreshView(),
      child: GetBuilder<FreelancingJobsController>(
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
                            onPressed: () => Get.toNamed(
                              '/freelancingJobsFilter',
                            ),
                            icon: const Icon(Icons.filter_alt),
                            color: Colors.lightBlue.shade900,
                          ),
                        ],
                      ),
                      ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: controller.freelancingJobs.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () => controller.viewDetails(
                              controller.freelancingJobs[index],
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
                                  photo:
                                      controller.freelancingJobs[index].photo,
                                  jobTitle:
                                      controller.freelancingJobs[index].title,
                                  jobType:
                                      controller.freelancingJobs[index].type,
                                  publishedBy: controller
                                      .freelancingJobs[index].poster.name,
                                  publishDate: controller
                                      .freelancingJobs[index].publishDate,
                                  deadline: controller
                                      .freelancingJobs[index].deadline,
                                  minOffer: controller
                                      .freelancingJobs[index].minOffer,
                                  maxOffer: controller
                                      .freelancingJobs[index].maxOffer,
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
                                  text: controller.freelancingJobs.isEmpty
                                      ? 'No jobs to show'
                                      : 'No more jobs',
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
