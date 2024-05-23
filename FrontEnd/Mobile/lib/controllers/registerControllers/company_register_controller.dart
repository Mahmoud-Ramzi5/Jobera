import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/states.dart';
import 'package:jobera/views/home_view.dart';

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
  late DateTime selectedDate;
  late Dio dio;
  late Countries? selectedCountry;
  late List<Countries> countries = [];
  List<States> states = [];
  States? selectedState;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    nameController = TextEditingController();
    workFieldController = TextEditingController();
    emailController = TextEditingController();
    phoneNumberController = TextEditingController();
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
    passwordToggle = true;
    selectedDate = DateTime.now();
    countryCode = CountryCode(dialCode: '+963');
    dio = Dio();
    selectedCountry = null;
    super.onInit();
  }

  @override
  Future<void> onReady() async {
    await getCountries();
    super.onReady();
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
    states = [];
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

  Future<dynamic> companyRegister(
    String name,
    String workField,
    String email,
    String password,
    String confirmPassword,
    int state,
    String phoneNumber,
    String date,
  ) async {
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
            "founding_date": date,
            "type": "company",
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
            Get.offAll(() => HomeView());
          },
        );
      }
    } on DioException catch (e) {
      await Dialogs().showErrorDialog(
        'Register Failed',
        e.response!.data.toString(),
      );
    }
  }
}
