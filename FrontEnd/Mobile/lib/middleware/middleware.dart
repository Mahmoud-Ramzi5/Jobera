import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';

class Middleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    String? token = sharedPreferences?.getString('access_token');
    if (token == null) {
      return const RouteSettings(name: '/login');
    } else {
      if (isTokenValid) {
        return const RouteSettings(name: '/home');
      } else {
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Dialogs().showSesionExpiredDialog();
          },
        );
      }
    }
    return super.redirect(route);
  }
}
