import 'package:get/get.dart';

class Validation {
  String? validateRequiredField(String? value) {
    if (value!.isEmpty) {
      return "152".tr;
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (value!.isEmpty) {
      return "152".tr;
    } else if (!value.isEmail) {
      return "146".tr;
    }
    return null;
  }

  String? validateConfirmPassword(String? value, String? value2) {
    if (value!.isEmpty) {
      return "152".tr;
    } else if (value != value2) {
      return "147".tr;
    }
    return null;
  }

  String? validateNumber(String? value) {
    if (value!.isEmpty) {
      return "152".tr;
    } else if (!value.isNum) {
      return "148".tr;
    }
    return null;
  }

  String? validateOffer(String? value, double min, double max) {
    if (value!.isEmpty) {
      return "152".tr;
    } else if (!value.isNum) {
      return "149".tr;
    } else if (double.parse(value) < min || double.parse(value) > max) {
      return "150".tr;
    }
    return null;
  }
}
