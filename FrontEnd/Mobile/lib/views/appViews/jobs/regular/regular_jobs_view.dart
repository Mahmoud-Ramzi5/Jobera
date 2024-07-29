import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/components/jobs_components.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobsView extends StatelessWidget {
  final RegularJobController _regularJobController =
      Get.put(RegularJobController());

  RegularJobsView({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<RegularJobController>(
      builder: (controller) => Scaffold(
        body: controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                controller: controller.scrollController,
                child: Column(
                  children: [
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
                            child: RegularJobComponent(
                              photo: controller.regularJobs[index].photo,
                              jobTitle: controller.regularJobs[index].title,
                              jobType: controller.regularJobs[index].type,
                              publishedBy:
                                  controller.regularJobs[index].poster.name,
                              date: controller.regularJobs[index].publishDate,
                              salary: controller.regularJobs[index].salary,
                              onPressed: () {},
                            ),
                          ),
                        );
                      },
                    ),
                    controller.paginationData.hasMorePages
                        ? const Center(
                            child: CircularProgressIndicator(),
                          )
                        : const BodyText(text: 'No more jobs')
                  ],
                ),
              ),
      ),
    );
  }
}
