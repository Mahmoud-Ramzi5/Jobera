import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/skill.dart';
import 'package:jobera/models/state.dart';

class PostJobController extends GetxController {
  late GlobalKey<FormState> formField;
  late SettingsController settingsController;
  late RegularJobsController regularJobsController;
  late FreelancingJobsController freelancingJobsController;
  late HomeController homeController;
  late Dio dio;
  late Map<String, String> jobTypes;
  late String selectedJobType;
  late String selectedWorkTime;
  late TextEditingController jobTitleController;
  late TextEditingController descriptionController;
  late TextEditingController minOfferController;
  late TextEditingController maxOfferController;
  late TextEditingController salaryController;
  late XFile? image;
  late DateTime selectedDate;
  late String selectedLocation;
  late Country? selectedCountry;
  late List<Country> countries = [];
  States? selectedState;
  List<States> states = [];
  List<Skill> selectedSkills = [];
  List<Skill> skills = [];
  Uint8List displayImage = Uint8List(0);
  bool loading = true;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    settingsController = Get.find<SettingsController>();
    homeController = Get.find<HomeController>();
    regularJobsController = Get.find<RegularJobsController>();
    freelancingJobsController = Get.find<FreelancingJobsController>();
    dio = Dio();
    jobTypes = {
      'Freelancing': 'freelancing',
      'Regular': 'regular',
    };
    selectedJobType = 'freelancing';
    selectedWorkTime = 'FullTime';
    jobTitleController = TextEditingController();
    descriptionController = TextEditingController();
    minOfferController = TextEditingController();
    maxOfferController = TextEditingController();
    salaryController = TextEditingController();
    image = null;
    selectedDate = DateTime.now();
    selectedLocation = 'Remotely';
    selectedCountry = null;
    countries = await settingsController.getCountries();
    skills = await settingsController.getAllSkills();
    loading = false;
    update();
    super.onInit();
  }

  @override
  void onClose() {
    jobTitleController.dispose();
    descriptionController.dispose();
    super.onClose();
  }

  Future<void> addPhoto() async {
    image = await settingsController.pickPhotoFromGallery();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  void changeJobType(String value) {
    selectedJobType = value;
    update();
  }

  Future<void> takePhoto() async {
    image = await settingsController.takePhotoFromCamera();
    if (image != null) {
      displayImage = await image!.readAsBytes();
      update();
    } else {
      return;
    }
  }

  void removePhoto() {
    image = null;
    update();
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now(),
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null && picked != selectedDate) {
      selectedDate = picked;
      update();
    }
  }

  void changeLocation(String value) {
    selectedLocation = value;
    update();
  }

  void changeWorkTime(String value) {
    selectedWorkTime = value;
    update();
  }

  Future<void> selectCountry(Country country) async {
    selectedCountry = country;
    selectedState = null;
    states = [];
    states = await settingsController.getStates(country.countryName);
    update();
  }

  void selectState(States state) {
    selectedState = state;
    update();
  }

  Future<void> searchSkills(String value) async {
    skills.clear();
    skills = await settingsController.searchSkills(value);
    skills.removeWhere(
        (item) => selectedSkills.any((mySkill) => item.name == mySkill.name));
    update();
  }

  void addToOMySkills(Skill skill) {
    if (selectedSkills.length < 5) {
      selectedSkills.add(skill);
      skills.remove(skill);
      update();
    } else {
      Dialogs().showErrorDialog(
        'Error',
        'Max 5 skills per Job',
      );
    }
  }

  void deleteSkill(Skill skill) {
    selectedSkills.remove(skill);
    skills.add(skill);
    update();
  }

  Future<void> addRegJob(
    String title,
    String description,
    int stateId,
    String salary,
    String type,
    List<Skill> skills,
    XFile? image,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (skills.isNotEmpty) {
      final data = FormData.fromMap(
        {
          "title": title,
          "description": description,
          'state_id': stateId,
          "salary": double.parse(salary),
          "type": type,
        },
      );
      if (image != null) {
        data.files.add(
          MapEntry(
            'photo',
            await MultipartFile.fromFile(image.path),
          ),
        );
      }

      for (int i = 0; i < skills.length; i++) {
        data.fields.add(
          MapEntry(
            'skills[$i]',
            skills[i].id.toString(),
          ),
        );
      }

      try {
        var response = await dio.post(
          'http://192.168.43.23:8000/api/regJob/add',
          data: data,
          options: Options(
            headers: {
              'Content-Type':
                  'multipart/form-data; application/json; charset=UTF-8',
              'Accept': "application/json",
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 201) {
          regularJobsController.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
        );
      }
    }
  }

  Future<void> addFreelancingJob(
    String title,
    String description,
    int stateId,
    String minSalary,
    String maxSalary,
    DateTime deadline,
    List<Skill> skills,
    XFile? image,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    if (skills.isNotEmpty) {
      final data = FormData.fromMap(
        {
          'title': title,
          'description': description,
          'state_id': stateId,
          'min_salary': double.parse(minSalary),
          'max_salary': double.parse(maxSalary),
          'deadline': deadline.toString().split(' ')[0],
        },
      );
      if (image != null) {
        data.files.add(
          MapEntry(
            'photo',
            await MultipartFile.fromFile(image.path),
          ),
        );
      }

      for (int i = 0; i < skills.length; i++) {
        data.fields.add(
          MapEntry(
            'skills[$i]',
            skills[i].id.toString(),
          ),
        );
      }

      try {
        var response = await dio.post(
          'http://192.168.43.23:8000/api/FreelancingJob/add',
          data: data,
          options: Options(
            headers: {
              'Content-Type':
                  'multipart/form-data; application/json; charset=UTF-8',
              'Accept': "application/json",
              'Authorization': 'Bearer $token',
            },
          ),
        );
        if (response.statusCode == 201) {
          freelancingJobsController.refreshIndicatorKey.currentState!.show();
          Get.back();
        }
      } on DioException catch (e) {
        Dialogs().showErrorDialog(
          'Error',
          e.response!.data['errors'].toString(),
        );
      }
    }
  }
}
