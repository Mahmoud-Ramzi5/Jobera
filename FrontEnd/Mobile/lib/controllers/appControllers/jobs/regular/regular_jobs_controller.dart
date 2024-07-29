import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/pagination_data.dart';
import 'package:jobera/models/regular_job.dart';

class RegularJobController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late Dio dio;
  late ScrollController scrollController;
  late PaginationData paginationData;
  List<RegularJob> regularJobs = [];
  bool loading = true;
  int jobDetailsId = 0;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    dio = Dio();
    scrollController = ScrollController()..addListener(scrollListener);
    paginationData = PaginationData.empty();
    await fetchRegularJobs();
    loading = false;
    super.onInit();
  }

  void viewDetails(RegularJob regularjob) {
    jobDetailsId = regularjob.defJobId;
    Get.toNamed('/regularJobDetails');
  }

  Future<dynamic> fetchRegularJobs() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/regJobs',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        regularJobs = [
          for (var job in response.data['jobs']) (RegularJob.fromJson(job)),
        ];
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

  Future<dynamic> fetchMoreJobs(int page) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/regJobs?page=$page',
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
        e.response.toString(),
      );
    }
  }

  void scrollListener() {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      fetchMoreJobs(paginationData.currentPage + 1);
    }
  }
}
