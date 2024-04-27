import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class CompanyRegisterController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController nameController;
  late TextEditingController workFieldController;
  late TextEditingController emailController;
  late TextEditingController phoneNumberController;
  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;
  late bool passwordToggle;
  late CountryCode countryCode;
  late Dio dio;
  late Countries? selectedCountry;
  late List<Countries> countryOptions = [];
  List<States> stateOptions = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    nameController = TextEditingController();
    workFieldController = TextEditingController();
    emailController = TextEditingController();
    phoneNumberController = TextEditingController();
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
    passwordToggle = true;
    countryCode = CountryCode(dialCode: '+963');
    dio = Dio();
    selectedCountry = null;
    await getCountries();
    super.onInit();
  }

  @override
  void onClose() {
    nameController.dispose();
    workFieldController.dispose();
    emailController.dispose();
    phoneNumberController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.onClose();
  }

  void resetStates() {
    selectedState = null;
    stateOptions = [];
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

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
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
        for (var country in response.data['countries']) {
          final countryMap =
              Countries.fromJson(country as Map<String, dynamic>);
          countryOptions.add(countryMap);
        }
        update();
      }
    } on DioException catch (e) {
      Get.defaultDialog(
        title: 'Error',
        backgroundColor: Colors.orange.shade100,
        content: Column(
          children: [
            const Icon(
              Icons.cancel_outlined,
              color: Colors.red,
            ),
            BodyText(text: e.response!.data["errors"].toString()),
          ],
        ),
      );
    }
  }

  Future<dynamic> getStates(int countryId) async {
    try {
      var response = await dio.post(
        'http://10.0.2.2:8000/api/states',
        data: {"country_id": countryId},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        resetStates();
        for (var state in response.data['states']) {
          final stateMap = States.fromJson(state as Map<String, dynamic>);
          stateOptions.add(stateMap);
        }
        update();
      }
    } on DioException catch (e) {
      Get.defaultDialog(
        title: 'Error',
        backgroundColor: Colors.orange.shade100,
        content: Column(
          children: [
            const Icon(
              Icons.cancel_outlined,
              color: Colors.red,
            ),
            BodyText(text: e.response!.data["errors"].toString()),
          ],
        ),
      );
    }
  }
}
