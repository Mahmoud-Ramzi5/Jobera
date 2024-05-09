import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/main.dart';

class Middleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    if (isValidToken) {
      return const RouteSettings(name: '/home');
    } else if (!isValidToken) {
      return const RouteSettings(name: '/login');
    }
    return super.redirect(route);
  }
}
