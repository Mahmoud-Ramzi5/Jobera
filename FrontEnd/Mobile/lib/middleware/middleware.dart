import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/main.dart';

class Middleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    String? token = sharedPreferences?.getString('access_token');
    print(token);
    if (token != null) {
      if (isTokenValid) {
        return const RouteSettings(name: '/home');
      } else if (!isTokenValid) {
        Dialogs().showSesionExpiredDialog();
        Future.delayed(
          const Duration(seconds: 1),
          () {
            return const RouteSettings(name: '/login');
          },
        );
      }
    }
    return super.redirect(route);
  }
}
