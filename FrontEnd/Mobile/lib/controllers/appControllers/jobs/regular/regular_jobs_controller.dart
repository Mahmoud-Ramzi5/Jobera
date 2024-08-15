import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/regular_job.dart';
import 'package:jobera/models/skill.dart';

class RegularJobsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late SettingsController settingsController;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  late TextEditingController nameController;
  late TextEditingController minSalaryController;
  late TextEditingController maxSalaryController;
  List<RegularJob> regularJobs = [];
  bool loading = true;
  int jobDetailsId = 0;
  List<Skill> skills = [];
  List<bool> selectedSkills = [];
  List<String> skillNames = [];
  bool isFiltered = false;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    settingsController = Get.find<SettingsController>();
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    nameController = TextEditingController();
    minSalaryController = TextEditingController();
    maxSalaryController = TextEditingController();
    await fetchRegularJobs(1);
    skills = await settingsController.getAllSkills();
    for (var i = 0; i < skills.length; i++) {
      selectedSkills.add(false);
    }
    loading = false;
    update();
    super.onInit();
  }

  @override
  void onClose() {
    nameController.dispose();
    minSalaryController.dispose();
    maxSalaryController.dispose();
    super.onClose();
  }

  void viewDetails(RegularJob regularjob) {
    jobDetailsId = regularjob.defJobId;
    Get.toNamed('/regularJobDetails');
  }

  void selectSkill(int index) {
    selectedSkills[index] = !selectedSkills[index];
    if (selectedSkills[index]) {
      skillNames.add(skills[index].name);
    } else {
      skillNames.remove(skills[index].name);
    }
    update();
  }

  Future<void> refreshView() async {
    regularJobs.clear();
    Future.delayed(const Duration(milliseconds: 100));
    await fetchRegularJobs(1);
  }

  Future<void> submitFilter() async {
    regularJobs.clear();
    Future.delayed(const Duration(milliseconds: 100));
    await filterJobs(
      1,
      nameController.text,
      minSalaryController.text,
      maxSalaryController.text,
      skillNames,
    );
  }

  Future<void> resetFilter() async {
    isFiltered = false;
    regularJobs.clear();
    nameController.clear();
    minSalaryController.clear();
    maxSalaryController.clear();
    skillNames.clear();
    for (var i = 0; i < skills.length; i++) {
      selectedSkills[i] = false;
    }
    update();
    await fetchRegularJobs(1);
  }

  Future<dynamic> fetchRegularJobs(int page) async {
    isFiltered = false;
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.1.106:8000/api/regJobs?page=$page',
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
          regularJobs.add(
            RegularJob.fromJson(job),
          );
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

  Future<dynamic> filterJobs(
    int page,
    String name,
    String minSalary,
    String maxSalary,
    List<String> skillNames,
  ) async {
    isFiltered = true;
    String url = 'http://192.168.1.106:8000/api/regJobs?page=$page';
    if (name.isNotEmpty) {
      url = '$url&company_name[like]=$name';
    }
    if (minSalary.isNotEmpty && maxSalary.isNotEmpty) {
      if (double.parse(minSalary) >= 0 && double.parse(maxSalary) >= 0) {
        url = '$url&salary[gte]=$minSalary&salary[lte]=$maxSalary';
      }
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
        for (var job in response.data['jobs']) {
          regularJobs.add(
            RegularJob.fromJson(job),
          );
        }
        paginationData =
            PaginationData.fromJson(response.data['pagination_data']);
        update();
        Get.back();
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
      if (isFiltered) {
        await filterJobs(
          paginationData.currentPage + 1,
          nameController.text,
          minSalaryController.text,
          maxSalaryController.text,
          skillNames,
        );
      } else {
        await fetchRegularJobs(paginationData.currentPage + 1);
      }
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
}
