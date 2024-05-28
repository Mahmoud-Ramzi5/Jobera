import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';

class UserEditCertificatesController extends GetxController {
  late UserProfileController profileController;
  late Dio dio;

  @override
  Future<void> onInit() async {
    profileController = Get.find<UserProfileController>();
    dio = Dio();
    super.onInit();
  }
}
