import 'package:get/get.dart';
import 'package:jobera/middleware/middleware.dart';
import 'package:jobera/views/home_view.dart';
import 'package:jobera/views/loginViews/forgot_password_view.dart';
import 'package:jobera/views/loginViews/login_view.dart';
import 'package:jobera/views/profileViews/company/company_edit_info_view.dart';
import 'package:jobera/views/profileViews/company/company_profile_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_certificates_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_education_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_info_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_skills_view.dart';
import 'package:jobera/views/profileViews/user/user_profile_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';
import 'package:jobera/views/settings_view.dart';
import 'package:jobera/views/splash_screen.dart';

List<GetPage<dynamic>>? getPages = [
  GetPage(
    name: '/splashScreen',
    page: () => const SplashScreen(),
    middlewares: [Middleware()],
  ),
  GetPage(
    name: '/login',
    page: () => LoginView(),
  ),
  GetPage(
    name: '/register',
    page: () => const RegisterView(),
  ),
  GetPage(
    name: '/forgotPassword',
    page: () => ForgotPasswordView(),
  ),
  GetPage(
    name: '/home',
    page: () => HomeView(),
  ),
  GetPage(
    name: '/settings',
    page: () => const SettingsView(),
  ),
  GetPage(
    name: '/userProfile',
    page: () => UserProfileView(),
  ),
  GetPage(
    name: '/companyProfile',
    page: () => CompanyProfileView(),
  ),
  GetPage(
    name: '/userEditInfo',
    page: () => UserEditInfoView(),
  ),
  GetPage(
    name: '/companyEditInfo',
    page: () => CompanyEditInfoView(),
  ),
  GetPage(
    name: '/userEditEducation',
    page: () => UserEditEducationView(),
  ),
  GetPage(
    name: '/userEditSkills',
    page: () => UserEditSkillsView(),
  ),
  GetPage(
    name: '/userEditCertificates',
    page: () => UserEditCertificatesView(),
  ),
];
