import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/job_feed.dart';

class JobFeedController extends GetxController {
  late Dio dio;
  late HomeController homeController;
  List<MostPayedRegJobs> mostPayedRegJobs = [];
  List<MostPayedFreelancingJobs> mostPayedFreeLancingJobs = [];
  List<MostPostingCompanies> mostPostingComapnies = [];
  List<MostNeededSkills> mostNeededSkills = [];
  List<Stat> stats = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    dio = Dio();
    homeController = Get.find<HomeController>();
    await getTops();
    await getStats();
    loading = false;
    update();
    super.onInit();
  }

  void viewRegularJob(int defJobId) {
    RegularJobsController regularJobsController =
        Get.find<RegularJobsController>();
    regularJobsController.jobDetailsId = defJobId;
    Get.toNamed('/regularJobDetails');
  }

  void viewFreelancingJob(int defJobId) {
    FreelancingJobsController freelancingJobsController =
        Get.find<FreelancingJobsController>();
    freelancingJobsController.jobDetailsId = defJobId;
    Get.toNamed('/freelancingJobDetails');
  }

  void viewCompanyProfile(int companyId, String companyName) {
    homeController.isOtherUserProfile = true;
    homeController.otherUserId = companyId;
    homeController.otherUserName = companyName;
    Get.toNamed('/companyProfile');
  }

  Future<void> getTops() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.2:8000/api/jobFeed/tops',
        options: Options(
          headers: {
            'Content-Type':
                'multipart/form-data; application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        mostPayedRegJobs = [
          for (var mostPayedRegJob in response.data['MostPayedRegJobs'])
            MostPayedRegJobs.fromJson(mostPayedRegJob)
        ];
        mostPayedFreeLancingJobs = [
          for (var mostPayedFreelancingJob
              in response.data['MostPayedFreelancingJobs'])
            MostPayedFreelancingJobs.fromJson(mostPayedFreelancingJob)
        ];
        mostPostingComapnies = [
          for (var mostPostingCompanie in response.data['MostPostingCompanies'])
            MostPostingCompanies.fromJson(mostPostingCompanie)
        ];
        mostNeededSkills = [
          for (var mostNeededSkill in response.data['MostNeededSkills'])
            MostNeededSkills.fromJson(mostNeededSkill)
        ];
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<void> getStats() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.2:8000/api/jobFeed/stats',
        options: Options(
          headers: {
            'Content-Type':
                'multipart/form-data; application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        for (var stat in response.data['stats']) {
          stats.add(Stat.fromJson(stat));
        }
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
