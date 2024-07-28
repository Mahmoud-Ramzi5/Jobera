import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/job_details_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';
import 'package:jobera/models/pagination_data.dart';

class FreelancingJobsController extends GetxController {
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  List<FreelancingJob> freelancingJobs = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    loading = false;
    await fetchFreelancingJobs();
    super.onInit();
  }

  void viewDetails(FreelancingJob job) {
    JobDetailsController jobDetailsController = Get.put(JobDetailsController());
    jobDetailsController.job = job;
    jobDetailsController.isFreelancing = true;
    Get.toNamed('/jobDetails');
  }

  Future<dynamic> fetchFreelancingJobs() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/FreelancingJobs',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        freelancingJobs = [
          for (var job in response.data['jobs']) (FreelancingJob.fromJson(job)),
        ];
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

  Future<dynamic> fetchMoreJobs(int page) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.39.51:8000/api/FreelancingJobs?page=$page',
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
          freelancingJobs.add(
            FreelancingJob.fromJson(job),
          );
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

  void scrollListener() {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      fetchMoreJobs(paginationData.currentPage + 1);
    }
  }
}
