import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/enums.dart';
import 'package:jobera/main.dart';

class Middleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    switch (middlewareCase) {
      case MiddlewareCases.noToken:
        return const RouteSettings(name: '/login');
      case MiddlewareCases.validToken:
        return const RouteSettings(name: '/home');
      case MiddlewareCases.invalidToken:
        return const RouteSettings(name: '/login');
      default:
        return super.redirect(route);
    }
  }
}
