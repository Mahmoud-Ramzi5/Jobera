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
  late GlobalKey<FormState> formField;
  late Dio dio;
  late HomeController homeController;
  late FreelancingJobsController freelancingJobsController;
  late FreelancingJob freelancingJob;
  late TextEditingController commentController;
  late TextEditingController offerController;
  late double share;
  bool applied = false;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    homeController = Get.find<HomeController>();
    freelancingJobsController = Get.find<FreelancingJobsController>();
    freelancingJob = FreelancingJob.empty();
    commentController = TextEditingController();
    offerController = TextEditingController();
    share = 0.0;
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

  void calculateShare() {
    if (offerController.text.isNotEmpty) {
      if (double.parse(offerController.text) > 0 &&
          double.parse(offerController.text) < 2000) {
        share = double.parse(offerController.text) -
            0.15 * double.parse(offerController.text);
      } else if (double.parse(offerController.text) > 2000 &&
          double.parse(offerController.text) < 15000) {
        share = double.parse(offerController.text) -
            0.12 * double.parse(offerController.text);
      } else if (double.parse(offerController.text) > 15000) {
        share = double.parse(offerController.text) -
            0.10 * double.parse(offerController.text);
      }
    } else {
      share = 0.0;
    }
    update();
  }

  Future<dynamic> fetchFreelancingJob(int jobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.108:8000/api/FreelancingJobs/$jobId',
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

  Future<dynamic> applyFreelancingJob(
    int jobId,
    String comment,
    String offer,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.108:8000/api/FreelancingJob/apply',
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
          "offer": double.parse(offer),
        },
      );

      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        freelancingJobsController.refreshIndicatorKey.currentState!.show();
        applied = true;
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
        'http://192.168.0.108:8000/api/FreelancingJobs/$jobId',
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

  Future<dynamic> acceptUser(
    int competitorId,
    int defJobId,
    double? offer,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.108:8000/api/FreelancingJob/accept/$defJobId',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "freelancing_job_competitor_id": competitorId,
          "offer": offer,
        },
      );

      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        freelancingJobsController.refreshIndicatorKey.currentState!.show();
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> endJob(
    int defJobId,
    int senderId,
    int recieverId,
    double? offer,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.108:8000/api/FreelancingJob/done/$defJobId',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "sender_id": senderId,
          "receiver_id": recieverId,
          "amount": offer,
        },
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        freelancingJobsController.refreshIndicatorKey.currentState!.show();
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
