import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/manage/manage_bookmarks_controller.dart';
import 'package:jobera/controllers/appControllers/manage/manage_posts_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/regular_job.dart';

class RegularJobDetailsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late HomeController homeController;
  late RegularJobsController regularJobsController;
  late RegularJob regularJob;
  late TextEditingController commentController;
  bool applied = false;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    homeController = Get.find<HomeController>();
    regularJobsController = Get.find<RegularJobsController>();
    regularJob = RegularJob.empty();
    commentController = TextEditingController();
    await fetchRegularJob(regularJobsController.jobDetailsId);
    loading = false;
    for (var i = 0; i < regularJob.competitors.length; i++) {
      if (homeController.isCompany) {
        if (regularJob.competitors[i].userId == homeController.company!.id) {
          applied = true;
          break;
        }
      } else {
        if (regularJob.competitors[i].userId == homeController.user!.id) {
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
    if (!homeController.inManage) {
      regularJobsController.fetchRegularJobs(1);
    } else {
      if (homeController.inPosts) {
        homeController.inPosts = false;
        ManagePostsController managePostsController =
            Get.find<ManagePostsController>();
        managePostsController.refreshIndicatorKey.currentState!.show();
      } else if (homeController.inBookmarks) {
        homeController.inBookmarks = false;
        ManageBookmarksController manageBookmarksController =
            Get.find<ManageBookmarksController>();
        manageBookmarksController.refreshIndicatorKey.currentState!.show();
      }
    }
    Get.back();
  }

  Future<dynamic> fetchRegularJob(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.106:8000/api/regJobs/$id',
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
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/regJob/apply',
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
        refreshIndicatorKey.currentState!.show();
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
        'http://192.168.0.106:8000/api/rggJobs/$jobId',
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
        goBack();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> acceptUser(int competitorId, int defJobId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/regJob/accept/$defJobId',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "reg_job_competitor_id": competitorId,
        },
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

  Future<dynamic> createChat(int recieverId) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.106:8000/api/chats/create',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "reciver_id": recieverId,
        },
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
