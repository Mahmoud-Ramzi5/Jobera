import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';

class FreelancingJobDetailsController extends GetxController {
  late Dio dio;
  late HomeController homeController;
  late FreelancingJobsController freelancingJobsController;
  late FreelancingJob freelancingJob;
  bool loading = true;

  @override
  Future<void> onInit() async {
    dio = Dio();
    homeController = Get.find<HomeController>();
    freelancingJobsController = Get.find<FreelancingJobsController>();
    freelancingJob = FreelancingJob.empty();
    await fetchRegularJob(freelancingJobsController.jobDetailsId);
    loading = false;
    super.onInit();
  }

  void viewUserProfile() {
    homeController.isOtherProfile = true;
  }

  Future<dynamic> fetchRegularJob(int id) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/FreelancingJobs/$id',
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
}
