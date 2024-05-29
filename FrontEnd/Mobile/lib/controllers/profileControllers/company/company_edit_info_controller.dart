import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/controllers/service_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class CompanyEditInfoController extends GetxController {
  late CompanyProfileController profileController;
  late ServiceController serviceController;
  late GlobalKey<FormState> formField;
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
    serviceController = Get.find<ServiceController>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    editNameController =
        TextEditingController(text: profileController.company.name);
    editFieldController =
        TextEditingController(text: profileController.company.field);
    countryCode = CountryCode(
      dialCode: profileController.company.phoneNumber,
    );
    editPhoneNumberController = TextEditingController(
      text: profileController.company.phoneNumber,
    );
    countries = await serviceController.getCountries();
    selectedCountry = countries.firstWhere(
        (element) => element.countryName == profileController.company.country);
    states = await serviceController.getStates(selectedCountry!.countryName);
    selectedState = states.firstWhere(
        (element) => element.stateName == profileController.company.state);
    update();
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
    editPhoneNumberController.text = code.dialCode!;
    update();
  }

  Future<void> selectCountry(Countries country) async {
    selectedCountry = country;
    selectedState = null;
    states = [];
    states = await serviceController.getStates(country.countryName);
    update();
  }

  void selectState(States state) {
    selectedState = state;
    update();
  }

  Future<dynamic> editBasicInfo(
    String name,
    String field,
    String phoneNumber,
    int stateId,
  ) async {
    String? token = sharedPreferences?.getString('access_token');
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/profile/edit',
        data: {
          "name": name,
          "field": field,
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
        e.response!.data['message'].toString(),
      );
    }
  }
}
