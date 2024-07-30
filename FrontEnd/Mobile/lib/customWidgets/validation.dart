import 'package:get/get.dart';

class Validation {
  String? validateRequiredField(String? value) {
    if (value!.isEmpty) {
      return "Required Field";
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (value!.isEmpty) {
      return "Required Field";
    } else if (!value.isEmail) {
      return "Invalid Email";
    }
    return null;
  }

  String? validateConfirmPassword(String? value, String? value2) {
    if (value!.isEmpty) {
      return "Required Field";
    } else if (value != value2) {
      return "Password does not match Confirm Password";
    }
    return null;
  }

  String? validatePhoneNumber(String? value) {
    if (value!.isEmpty) {
      return "Required Field";
    } else if (!value.isNum) {
      return "Invalid Phone Number";
    }
    return null;
  }

  String? validateOffer(String? value, double min, double max) {
    if (value!.isEmpty) {
      return "Required Field";
    } else if (!value.isNum) {
      return "Invalid Offer";
    } else if (double.parse(value) < min || double.parse(value) > max) {
      return "Not in offer Range";
    }
    return null;
  }
}
