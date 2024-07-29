import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/regular_job.dart';

class RegularJobDetailsController extends GetxController {
  late Dio dio;
  late HomeController homeController;
  late RegularJobController regularJobsController;
  late RegularJob regularJob;
  bool loading = true;

  @override
  Future<void> onInit() async {
    dio = Dio();
    homeController = Get.find<HomeController>();
    regularJobsController = Get.find<RegularJobController>();
    regularJob = RegularJob.empty();
    await fetchRegularJob(regularJobsController.jobDetailsId);
    loading = false;
    super.onInit();
  }

  void viewUserProfile() {
    homeController.isOtherUserProfile = true;
    homeController.otherUserId = regularJob.poster.userId;
    homeController.otherUserName = regularJob.poster.name;
    Get.toNamed('/companyProfile');
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
}
