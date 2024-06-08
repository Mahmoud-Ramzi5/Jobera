import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/profileControllers/company/company_profile_controller.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/company.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class CompanyEditInfoController extends GetxController {
  late CompanyProfileController profileController;
  late Company company;
  late GeneralController generalController;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late TextEditingController editNameController;
  late TextEditingController editPhoneNumberController;
  late TextEditingController editFieldController;
  late CountryCode countryCode;
  Country? selectedCountry;
  late List<Country> countries = [];
  late List<States> states = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    profileController = Get.find<CompanyProfileController>();
    company = profileController.company;
    generalController = Get.find<GeneralController>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    editNameController = TextEditingController(text: company.name);
    editFieldController = TextEditingController(text: company.field);
    countryCode = CountryCode(
      dialCode: company.phoneNumber,
    );
    editPhoneNumberController = TextEditingController(
      text: company.phoneNumber,
    );
    countries = await generalController.getCountries();
    selectedCountry = countries
        .firstWhere((element) => element.countryName == company.country);
    states = await generalController.getStates(selectedCountry!.countryName);
    selectedState =
        states.firstWhere((element) => element.stateName == company.state);
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

  Future<void> selectCountry(Country country) async {
    selectedCountry = country;
    selectedState = null;
    states = [];
    states = await generalController.getStates(country.countryName);
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
        'http://192.168.1.2:8000/api/profile/edit',
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
        e.response!.data['errors'].toString(),
      );
    }
  }
}
