import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/user/user_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class UserEditInfoController extends GetxController {
  late UserProfileController profileController;
  late Dio dio;
  late TextEditingController editNameController;
  late TextEditingController editPhoneNumberController;
  late CountryCode countryCode;
  Countries? selectedCountry;
  late List<Countries> countries = [];
  late List<States> states = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    profileController = Get.find<UserProfileController>();
    dio = Dio();
    editNameController =
        TextEditingController(text: profileController.user.name);
    countryCode = CountryCode(
      dialCode: profileController.user.phoneNumber,
    );
    editPhoneNumberController = TextEditingController(
      text: profileController.user.phoneNumber,
    );
    await getCountries();
    selectedCountry = countries.firstWhere(
        (element) => element.countryName == profileController.user.country);
    await getStates(selectedCountry!.countryName);
    selectedState = states.firstWhere(
        (element) => element.stateName == profileController.user.state);
    super.onInit();
  }

  @override
  void onClose() {
    editNameController.dispose();
    editPhoneNumberController.dispose();
    super.onClose();
  }

  void selectCountryCode(CountryCode code) {
    countryCode = code;
    editPhoneNumberController.text = code.dialCode!;
    update();
  }

  void selectCountry(Countries country) {
    selectedCountry = country;
    update();
  }

  void selectState(States state) {
    selectedState = state;
    update();
  }

  void resetStates() {
    selectedState = null;
    states = [];
  }

  Future<dynamic> getCountries() async {
    try {
      var response = await dio.get(
        'http://192.168.0.101:8000/api/countries',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        countries = Countries.fromJsonList(
          response.data['countries'],
        );
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> getStates(String countryName) async {
    try {
      var response = await dio.post(
        'http://192.168.0.101:8000/api/states',
        data: {"country_name": countryName},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        resetStates();
        states = States.fromJsonList(
          response.data['states'],
        );
        update();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }

  Future<dynamic> editBasicInfo(
    String name,
    String phoneNumber,
    int stateId,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://192.168.0.101:8000/api/profile/edit',
        data: {
          "full_name": name,
          "phone_number": phoneNumber,
          "state_id": stateId,
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        profileController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response.toString(),
      );
    }
  }
}
