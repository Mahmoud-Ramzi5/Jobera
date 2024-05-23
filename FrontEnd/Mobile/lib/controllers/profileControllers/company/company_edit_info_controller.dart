import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class CompanyEditInfoController extends GetxController {
  late CompanyProfileController profileController;
  late Dio dio;
  late TextEditingController editNameController;
  late TextEditingController editPhoneNumberController;
  late TextEditingController editFieldController;
  late CountryCode countryCode;
  Countries? selectedCountry;
  late List<Countries> countries = [];
  late List<States> states = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    profileController = Get.find<CompanyProfileController>();
    dio = Dio();
    editNameController =
        TextEditingController(text: profileController.company.name);
    editFieldController =
        TextEditingController(text: profileController.company.field);
    countryCode = CountryCode(
      dialCode: profileController.company.phoneNumber.substring(
        0,
        profileController.company.phoneNumber.length - 9,
      ),
    );
    editPhoneNumberController = TextEditingController(
      text: profileController.company.phoneNumber
          .substring(profileController.company.phoneNumber.length - 9),
    );
    await getCountries();
    selectedCountry = countries.firstWhere(
        (element) => element.countryName == profileController.company.country);
    await getStates(selectedCountry!.countryName);
    selectedState = states.firstWhere(
        (element) => element.stateName == profileController.company.state);
    super.onInit();
  }

  @override
  void onClose() {
    editNameController.dispose();
    editPhoneNumberController.dispose();
    editFieldController.dispose();
    super.onClose();
  }

  void selectCountryCode(CountryCode code) {
    countryCode = code;
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
        'http://10.0.2.2:8000/api/countries',
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
        e.response!.data.toString(),
      );
    }
  }

  Future<dynamic> getStates(String countryName) async {
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/states',
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
        e.response!.data.toString(),
      );
    }
  }

//toDo:implement
  Future<dynamic> editBasicInfo() async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/profile/edit',
        data: {},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token'
          },
        ),
      );
      if (response.statusCode == 201) {
        Get.back();
        profileController.refreshIndicatorKey.currentState!.show();
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data.toString(),
      );
    }
  }
}
