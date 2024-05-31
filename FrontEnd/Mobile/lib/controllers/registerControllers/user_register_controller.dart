import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/controllers/service_controller.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';

class UserRegisterController extends GetxController {
  late GlobalKey<FormState> formField;
  late ServiceController serviceController;
  late TabController tabController;
  late TextEditingController fullNameController;
  late TextEditingController emailController;
  late TextEditingController phoneNumberController;
  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;
  late bool passwordToggle;
  late DateTime selectedDate;
  late String selectedGender;
  late CountryCode countryCode;
  late Dio dio;
  late Countries? selectedCountry;
  late List<Countries> countries = [];
  List<States> states = [];
  States? selectedState;

  @override
  Future<void> onInit() async {
    formField = GlobalKey<FormState>();
    serviceController = Get.find<ServiceController>();
    countryCode = CountryCode(dialCode: '+963');
    fullNameController = TextEditingController();
    emailController = TextEditingController();
    phoneNumberController = TextEditingController(text: countryCode.dialCode);
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
    passwordToggle = true;
    selectedDate = DateTime.now();
    selectedGender = 'MALE';
    dio = Dio();
    selectedCountry = null;
    countries = await serviceController.getCountries();
    update();
    super.onInit();
  }

  @override
  void onClose() {
    fullNameController.dispose();
    emailController.dispose();
    phoneNumberController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.onClose();
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

  void changeGender(String value) {
    selectedGender = value;
    update();
  }

  void selectCountryCode(CountryCode code) {
    countryCode = code;
    phoneNumberController.text = code.dialCode!;
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

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
  }

  Future<dynamic> userRegister(
    String fullName,
    String email,
    String password,
    String confirmPassword,
    int stateId,
    String phoneNumber,
    String gender,
    String birthDate,
  ) async {
    try {
      var response = await dio.post('http://192.168.0.103:8000/api/register',
          data: {
            "full_name": fullName,
            "email": email,
            "password": password,
            "confirm_password": confirmPassword,
            "state_id": stateId,
            "phone_number": phoneNumber,
            "gender": gender,
            "birth_date": birthDate,
            "type": "individual",
          },
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
            },
          ));
      if (response.statusCode == 201) {
        sharedPreferences?.setString(
          "access_token",
          response.data["access_token"].toString(),
        );
        await Dialogs().showSuccessDialog('Register Successful', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/home');
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Register Failed',
        e.response!.data['error'].toString(),
      );
    }
  }
}
