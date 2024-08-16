import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_jobs_controller.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_jobs_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/offer.dart';
import 'package:jobera/models/pagination_data.dart';

class ManageOffersController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late HomeController homeController;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  List<String> skillNames = [];
  List<Offer> freelancingOffer = [];
  List<Offer> regularOffers = [];
  bool loading = true;
  String offerType = 'Freelancing';

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    homeController = Get.find<HomeController>();
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    if (homeController.isCompany) {
      await getOffers(
          1, 'Freelancing', null, null, '', '', null, null, skillNames);
    } else {
      await getOffers(1, offerType, null, null, '', '', null, null, skillNames);
    }
    loading = false;
    update();
    super.onInit();
  }

  void viewFreelancingJob(int defJobId) {
    FreelancingJobsController freelancingJobsController =
        Get.find<FreelancingJobsController>();
    freelancingJobsController.jobDetailsId = defJobId;
    Get.toNamed('/freelancingJobDetails');
  }

  Future<void> refreshView() async {
    if (homeController.isCompany) {
      freelancingOffer.clear();
      freelancingOffer.clear();
      await getOffers(
          1, 'Freelancing', null, null, '', '', null, null, skillNames);
    } else {
      await getOffers(1, offerType, null, null, '', '', null, null, skillNames);
    }
  }

  Future<void> getRegularPosts() async {
    offerType = 'RegularJob';
    regularOffers.clear();
    await getOffers(1, offerType, null, null, '', '', null, null, skillNames);
  }

  Future<void> getFreelancingPosts() async {
    offerType = 'Freelancing';
    freelancingOffer.clear();
    await getOffers(1, offerType, null, null, '', '', null, null, skillNames);
  }

  void viewRegularJob(int defJobId) {
    RegularJobsController regularJobsController =
        Get.find<RegularJobsController>();
    regularJobsController.jobDetailsId = defJobId;
    Get.toNamed('/regularJobDetails');
  }

  Future<dynamic> getOffers(
    int page,
    String? type,
    String? userName,
    String? companyName,
    String minSalary,
    String maxSalary,
    DateTime? dateFrom,
    DateTime? dateTo,
    List<String> skillNames,
  ) async {
    String url = 'http://192.168.0.106:8000/api/manage/applied?page=$page';
    if (type != null) {
      url = '$url&type[eq]=$type';
    }
    if (userName != null) {
      url = '$url&user_name[like]=$userName';
    }
    if (companyName != null) {
      url = '$url}&company_name[like]=$companyName';
    }
    if (minSalary.isNotEmpty && maxSalary.isNotEmpty) {
      if (double.parse(minSalary) >= 0 && double.parse(maxSalary) >= 0) {
        url = '$url&salary[gte]=$minSalary&salary[lte]=$maxSalary';
      }
    }
    if (dateFrom != null) {
      url = '$url&deadline[gte]=${dateFrom.toString().split(' ')[0]}';
    }
    if (dateTo != null) {
      url = '$url&deadline[lte]=${dateTo.toString().split(' ')[0]}';
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
        if (homeController.isCompany) {
          for (var job in response.data['jobs']) {
            freelancingOffer.add(
              Offer.fromJson(job),
            );
          }
        } else {
          if (offerType == 'Freelancing') {
            for (var job in response.data['jobs']) {
              freelancingOffer.add(
                Offer.fromJson(job),
              );
            }
          } else {
            for (var job in response.data['jobs']) {
              regularOffers.add(
                Offer.fromJson(job),
              );
            }
          }
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

  Future<void> scrollListener() async {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      if (homeController.isCompany) {
      } else {}
    }
  }
}
