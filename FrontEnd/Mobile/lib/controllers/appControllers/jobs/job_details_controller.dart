import 'package:dio/dio.dart';
import 'package:get/get.dart';

class JobDetailsController extends GetxController {
  late Dio dio;
  dynamic job;
  bool isFreelancing = false;

  @override
  void onInit() {
    dio = Dio();
    super.onInit();
  }

  @override
  void onClose() {
    // TODO: implement onClose
    super.onClose();
  }
}
