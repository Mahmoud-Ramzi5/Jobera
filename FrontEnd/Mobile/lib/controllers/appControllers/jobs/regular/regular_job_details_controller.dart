import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/regular_job.dart';

class RegularJobDetailsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late HomeController homeController;
  late RegularJobController regularJobsController;
  late RegularJob regularJob;
  late TextEditingController commentController;
  bool applied = false;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    homeController = Get.find<HomeController>();
    regularJobsController = Get.find<RegularJobController>();
    regularJob = RegularJob.empty();
    commentController = TextEditingController();
    await fetchRegularJob(regularJobsController.jobDetailsId);
    loading = false;
    for (var i = 0; i < regularJob.competitors.length; i++) {
      if (regularJob.competitors[i].userId == homeController.user!.id) {
        applied = true;
        break;
      }
    }
    update();
    super.onInit();
  }

  @override
  void onClose() {
    commentController.dispose();
    super.onClose();
  }

  void viewUserProfile(int userId, String userName, String type) {
    if (userId != homeController.user!.id) {
      homeController.isOtherUserProfile = true;
      homeController.otherUserId = userId;
      homeController.otherUserName = userName;
    }
    if (type == 'company') {
      Get.toNamed('/companyProfile');
    } else {
      Get.toNamed('/userProfile');
    }
  }

  void goBack() {
    homeController.isOtherUserProfile = false;
    homeController.otherUserId = 0;
    homeController.otherUserName = '';
    Get.back();
  }

  Future<dynamic> fetchRegularJob(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/regJobs/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        regularJob = RegularJob.fromJson(response.data['job']);
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
        regularJobsController.refreshIndicatorKey.currentState!.show();
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
        'http://192.168.0.101:8000/api/rggJobs/$jobId',
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
        regularJobsController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
