import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';
import 'package:jobera/models/offer.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/regular_job.dart';

class ManagePostsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late HomeController homeController;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  List<FreelancingJob> freelancingPosts = [];
  List<RegularJob> regularPosts = [];
  List<String> skillNames = [];
  List<Offer> offers = [];
  bool loading = true;
  String postType = 'Freelancing';

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    homeController = Get.find<HomeController>();
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    if (homeController.isCompany) {
      await getPosts(1, postType, null, null, '', '', null, null, skillNames);
    } else {
      await getPosts(
          1, 'Freelancing', null, null, '', '', null, null, skillNames);
    }
    loading = false;
    update();
    super.onInit();
  }

  void viewFreelancingJob(int defJobId) {
    FreelancingJobsController freelancingJobsController =
        Get.find<FreelancingJobsController>();
    freelancingJobsController.jobDetailsId = defJobId;
    Get.toNamed('/freelancingJobDetails');
  }

  Future<void> refreshView() async {
    if (homeController.isCompany) {
      freelancingPosts.clear();
      regularPosts.clear();
      await getPosts(1, postType, null, null, '', '', null, null, skillNames);
    } else {
      await getPosts(
          1, 'Freelancing', null, null, '', '', null, null, skillNames);
    }
  }

  Future<void> getRegularPosts() async {
    postType = 'RegularJob';
    regularPosts.clear();
    await getPosts(1, postType, null, null, '', '', null, null, skillNames);
  }

  Future<void> getFreelancingPosts() async {
    postType = 'Freelancing';
    freelancingPosts.clear();
    await getPosts(1, postType, null, null, '', '', null, null, skillNames);
  }

  void viewRegularJob(int defJobId) {
    RegularJobsController regularJobsController =
        Get.find<RegularJobsController>();
    regularJobsController.jobDetailsId = defJobId;
    Get.toNamed('/regularJobDetails');
  }

  Future<dynamic> getPosts(
    int page,
    String? type,
    String? userName,
    String? companyName,
    String minSalary,
    String maxSalary,
    DateTime? dateFrom,
    DateTime? dateTo,
    List<String> skillNames,
  ) async {
    String url = 'http://192.168.1.106:8000/api/manage/posted?page=$page';
    if (type != null) {
      url = '$url&type[eq]=$type';
    }
    if (userName != null) {
      url = '$url&user_name[like]=$userName';
    }
    if (companyName != null) {
      url = '$url}&company_name[like]=$companyName';
    }
    if (minSalary.isNotEmpty && maxSalary.isNotEmpty) {
      if (double.parse(minSalary) >= 0 && double.parse(maxSalary) >= 0) {
        url = '$url&salary[gte]=$minSalary&salary[lte]=$maxSalary';
      }
    }
    if (dateFrom != null) {
      url = '$url&deadline[gte]=${dateFrom.toString().split(' ')[0]}';
    }
    if (dateTo != null) {
      url = '$url&deadline[lte]=${dateTo.toString().split(' ')[0]}';
    }
    if (skillNames.isNotEmpty) {
      url = '$url&skills=${skillNames.toString()}';
    }
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        url,
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        if (homeController.isCompany) {
          if (postType == 'Freelancing') {
            for (var job in response.data['jobs']) {
              freelancingPosts.add(
                FreelancingJob.fromJson(job),
              );
            }
          } else {
            for (var job in response.data['jobs']) {
              regularPosts.add(
                RegularJob.fromJson(job),
              );
            }
          }
        } else {
          for (var job in response.data['jobs']) {
            freelancingPosts.add(
              FreelancingJob.fromJson(job),
            );
          }
        }
        paginationData =
            PaginationData.fromJson(response.data['pagination_data']);
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<dynamic> bookmarkJob(int jobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.1.106:8000/api/jobs/$jobId/bookmark',
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
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> scrollListener() async {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      if (homeController.isCompany) {
        await getPosts(paginationData.currentPage + 1, postType, null, null, '',
            '', null, null, skillNames);
      } else {
        await getPosts(paginationData.currentPage + 1, postType, null, null, '',
            '', null, null, skillNames);
      }
    }
  }
}
