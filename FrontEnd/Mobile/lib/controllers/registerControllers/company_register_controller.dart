import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/general_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class CompanyRegisterController extends GetxController {
  late GlobalKey<FormState> formField;
  late GeneralController generalController;
  late TextEditingController nameController;
  late TextEditingController workFieldController;
  late TextEditingController emailController;
  late TextEditingController phoneNumberController;
  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;
  late bool passwordToggle;
  late CountryCode countryCode;
  late DateTime selectedDate;
  late Dio dio;
  late Country? selectedCountry;
  late List<Country> countries = [];
  List<States> states = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    generalController = Get.find<GeneralController>();
    countryCode = CountryCode(dialCode: '+963');
    nameController = TextEditingController();
    workFieldController = TextEditingController();
    emailController = TextEditingController();
    phoneNumberController = TextEditingController(text: countryCode.dialCode);
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
    passwordToggle = true;
    selectedDate = DateTime.now();
    dio = Dio();
    selectedCountry = null;
    countries = await generalController.getCountries();
    update();
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

  void selectCountryCode(CountryCode code) {
    countryCode = code;
    phoneNumberController.text = code.dialCode!;
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

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
        currentDate: DateTime.now(),
        initialEntryMode: DatePickerEntryMode.calendarOnly);
    if (picked != null && picked != selectedDate) {
      selectedDate = picked;
      update();
    }
  }

  Future<dynamic> companyRegister(
    String name,
    String workField,
    String email,
    String password,
    String confirmPassword,
    int state,
    String phoneNumber,
    DateTime date,
  ) async {
    Dialogs().loadingDialog();
    String newDate = '${date.day}-${date.month}-${date.year}';
    try {
      var response = await dio.post('http://10.0.2.2:8000/api/company/register',
          data: {
            "name": name,
            "field": workField,
            "email": email,
            "password": password,
            "confirm_password": confirmPassword,
            "state_id": state,
            "phone_number": phoneNumber,
            "founding_date": newDate,
            "type": "company",
          },
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
            },
          ));
      if (response.statusCode == 201) {
        Get.back();
        sharedPreferences?.setString(
          "access_token",
          response.data["access_token"].toString(),
        );
        Dialogs().showSuccessDialog('Register Successful', '');
        generalController.isInRegister = true;
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/viewPortfolios');
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Register Failed',
        e.response!.data['errors'].toString(),
      );
    }
  }
}
