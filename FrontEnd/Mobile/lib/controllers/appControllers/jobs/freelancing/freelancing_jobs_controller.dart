import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/freelancing_job.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/skill.dart';

class FreelancingJobsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late SettingsController settingsController;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  late TextEditingController nameController;
  late TextEditingController minOfferController;
  late TextEditingController maxOfferController;
  DateTime? dateFrom;
  DateTime? dateTo;
  List<FreelancingJob> freelancingJobs = [];
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
    minOfferController = TextEditingController();
    maxOfferController = TextEditingController();
    dateFrom = null;
    dateTo = null;
    await fetchFreelancingJobs(1);
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
    minOfferController.dispose();
    maxOfferController.dispose();
    super.onClose();
  }

  void viewDetails(FreelancingJob freelancingJob) {
    jobDetailsId = freelancingJob.defJobId;
    Get.toNamed('/freelancingJobDetails');
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

  Future<void> selectFromDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100),
      currentDate: DateTime.now(),
      initialEntryMode: DatePickerEntryMode.calendarOnly,
    );
    if (picked != null && picked != dateFrom) {
      dateFrom = picked;
    }
    update();
  }

  Future<void> selectToDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100),
      currentDate: DateTime.now(),
      initialEntryMode: DatePickerEntryMode.calendarOnly,
    );
    if (picked != null && picked != dateTo) {
      dateTo = picked;
    }
    update();
  }

  Future<void> refreshView() async {
    freelancingJobs.clear();
    fetchFreelancingJobs(1);
  }

  Future<void> resetFilter() async {
    isFiltered = false;
    freelancingJobs.clear();
    nameController.clear();
    minOfferController.clear();
    maxOfferController.clear();
    dateFrom = null;
    dateTo = null;
    skillNames.clear();
    for (var i = 0; i < skills.length; i++) {
      selectedSkills[i] = false;
    }
    update();
    await fetchFreelancingJobs(1);
  }

  Future<dynamic> fetchFreelancingJobs(int page) async {
    isFiltered = false;
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.107:8000/api/FreelancingJobs?page=$page',
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

  Future<dynamic> filterJobs(
    int page,
    String name,
    String minOffer,
    String maxOffer,
    DateTime? dateFrom,
    DateTime? dateTo,
    List<String> skillnames,
  ) async {
    isFiltered = true;
    String url = 'http://192.168.0.107:8000/api/FreelancingJobs?page=$page';
    if (name.isNotEmpty) {
      url = '$url&user_name[like]=$name';
    }
    if (minOffer.isNotEmpty && maxOffer.isNotEmpty) {
      if (double.parse(minOffer) >= 0 && double.parse(maxOffer) >= 0) {
        url = '$url&salary[gte]=$minOffer&salary[lte]=$maxOffer';
      }
    }
    if (dateFrom != null) {
      url = '$url&deadline[gte]=${dateFrom.toString().split(' ')[0]}';
    }
    if (dateTo != null) {
      url = '$url&deadline[lte]=${dateTo.toString().split(' ')[0]}';
    }
    if (skillNames.isNotEmpty) {
      url = '$url&skills=$skillnames';
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
          freelancingJobs.add(
            FreelancingJob.fromJson(job),
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
        e.response.toString(),
      );
    }
  }

  void scrollListener() {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      if (isFiltered) {
        filterJobs(
          paginationData.currentPage + 1,
          nameController.text,
          minOfferController.text,
          maxOfferController.text,
          dateFrom,
          dateTo,
          skillNames,
        );
      } else {
        fetchFreelancingJobs(paginationData.currentPage + 1);
      }
    }
  }
}
