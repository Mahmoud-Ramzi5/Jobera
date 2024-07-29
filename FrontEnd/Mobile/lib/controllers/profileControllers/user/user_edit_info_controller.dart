import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/settings_controller.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/controllers/profileControllers/profile_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';
import 'package:jobera/models/user.dart';

class UserEditInfoController extends GetxController {
  late ProfileController profileController;
  late User user;
  late SettingsController settingsController;
  late GlobalKey<FormState> formField;
  late Dio dio;
  late TextEditingController editNameController;
  late TextEditingController editPhoneNumberController;
  late CountryCode countryCode;
  Country? selectedCountry;
  late List<Country> countries = [];
  late List<States> states = [];
  States? selectedState;
  bool loading = true;

  @override
  Future<void> onInit() async {
    profileController = Get.find<ProfileController>();
    user = profileController.user;
    settingsController = Get.find<SettingsController>();
    formField = GlobalKey<FormState>();
    dio = Dio();
    editNameController = TextEditingController(text: user.name);
    countryCode = CountryCode(
      dialCode: user.phoneNumber,
    );
    editPhoneNumberController = TextEditingController(
      text: user.phoneNumber,
    );
    countries = await settingsController.getCountries();
    selectedCountry =
        countries.firstWhere((element) => element.countryName == user.country);
    states = await settingsController.getStates(selectedCountry!.countryName);
    selectedState =
        states.firstWhere((element) => element.stateName == user.state);
    loading = false;
    update();
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
        e.response!.data['errors'].toString(),
      );
    }
  }
}
