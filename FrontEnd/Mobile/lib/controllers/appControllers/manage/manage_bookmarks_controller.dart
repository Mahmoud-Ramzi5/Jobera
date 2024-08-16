import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/regular_job.dart';

class ManageBookmarksController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late HomeController homeController;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  List<dynamic> bookmarks = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    homeController = Get.find<HomeController>();
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    await getBookmarks(1);
    loading = false;
    update();
    super.onInit();
  }

  Future<dynamic> getBookmarks(
    int page,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/manage/bookmarked?page=$page',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        for (var job in response.data['jobs']) {
          if (job['type'] == "Freelancing") {
            bookmarks.add(FreelancingJob.fromJson(job));
          } else {
            bookmarks.add(RegularJob.fromJson(job));
          }
        }
        paginationData =
            PaginationData.fromJson(response.data['pagination_data']);
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<void> scrollListener() async {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      await getBookmarks(paginationData.currentPage + 1);
    }
  }

  void viewFreelancingJob(int defJobId) {
    homeController.inBookmarks = true;
    FreelancingJobsController freelancingJobsController =
        Get.find<FreelancingJobsController>();
    freelancingJobsController.jobDetailsId = defJobId;
    Get.toNamed('/freelancingJobDetails');
  }

  void viewRegularJob(int defJobId) {
    homeController.inBookmarks = true;
    RegularJobsController regularJobsController =
        Get.find<RegularJobsController>();
    regularJobsController.jobDetailsId = defJobId;
    Get.toNamed('/regularJobDetails');
  }

  Future<void> refreshView() async {
    bookmarks.clear();
    await getBookmarks(1);
  }

  Future<dynamic> bookmarkJob(int jobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/jobs/$jobId/bookmark',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
