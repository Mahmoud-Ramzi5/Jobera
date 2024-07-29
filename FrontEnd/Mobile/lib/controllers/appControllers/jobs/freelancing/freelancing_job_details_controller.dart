import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';

class FreelancingJobDetailsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late HomeController homeController;
  late FreelancingJobsController freelancingJobsController;
  late FreelancingJob freelancingJob;
  late TextEditingController commentController;
  late TextEditingController offerController;
  bool applied = false;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    homeController = Get.find<HomeController>();
    freelancingJobsController = Get.find<FreelancingJobsController>();
    freelancingJob = FreelancingJob.empty();
    commentController = TextEditingController();
    offerController = TextEditingController();
    await fetchFreelancingJob(freelancingJobsController.jobDetailsId);
    loading = false;
    for (var i = 0; i < freelancingJob.competitors.length; i++) {
      if (homeController.isCompany) {
        if (freelancingJob.competitors[i].userId ==
            homeController.company!.id) {
          applied = true;
          break;
        }
      } else {
        if (freelancingJob.competitors[i].userId == homeController.user!.id) {
          applied = true;
          break;
        }
      }
    }
    update();
    super.onInit();
  }

  @override
  void onClose() {
    commentController.dispose();
    offerController.dispose();
    super.onClose();
  }

  void viewUserProfile(int userId, String userName, String type) {
    if (type == 'company') {
      homeController.isOtherUserProfile = true;
      homeController.otherUserId = userId;
      homeController.otherUserName = userName;

      Get.toNamed('/companyProfile');
    } else {
      homeController.isOtherUserProfile = true;
      homeController.otherUserId = userId;
      homeController.otherUserName = userName;
      Get.toNamed('/userProfile');
    }
  }

  void goBack() {
    homeController.isOtherUserProfile = false;
    homeController.otherUserId = 0;
    homeController.otherUserName = '';
    Get.back();
  }

  Future<dynamic> fetchFreelancingJob(int jobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/FreelancingJobs/$jobId',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        freelancingJob = FreelancingJob.fromJson(response.data['job']);
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> applyRegJob(int jobId, String comment) async {
    Dialogs().loadingDialog();
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.101:8000/api/regJob/apply',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "job_id": jobId,
          "description": comment,
        },
      );

      if (response.statusCode == 200) {
        freelancingJobsController.refreshIndicatorKey.currentState!.show();
        refreshIndicatorKey.currentState!.show();
        Get.back();
        Get.back();
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> deleteJob(int jobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.delete(
        'http://192.168.0.101:8000/api/FreelancingJobs/$jobId',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 204) {
        Get.back();
        freelancingJobsController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
