import 'package:get/get.dart';
import 'package:jobera/middleware/middleware.dart';
import 'package:jobera/views/appViews/chats/chat_view.dart';
import 'package:jobera/views/appViews/chats/chats_view.dart';
import 'package:jobera/views/appViews/home_view.dart';
import 'package:jobera/views/appViews/jobs/freelancing/apply_freelancing_job_view.dart';
import 'package:jobera/views/appViews/jobs/freelancing/freelancing_job_details_view.dart';
import 'package:jobera/views/appViews/jobs/freelancing/freelancing_jobs_filter_view.dart';
import 'package:jobera/views/appViews/jobs/freelancing/freelancing_jobs_view.dart';
import 'package:jobera/views/appViews/jobs/post_job_view.dart';
import 'package:jobera/views/appViews/jobs/regular/apply_regular_job_view.dart';
import 'package:jobera/views/appViews/jobs/regular/regular_job_details_view.dart';
import 'package:jobera/views/appViews/jobs/regular/regular_jobs_filter_view.dart';
import 'package:jobera/views/appViews/jobs/regular/regular_jobs_view.dart';
import 'package:jobera/views/appViews/job_feed_view.dart';
import 'package:jobera/views/appViews/jobs/manage/manage_view.dart';
import 'package:jobera/views/appViews/notifications_view.dart';
import 'package:jobera/views/appViews/wallet_view.dart';
import 'package:jobera/views/loginViews/forgot_password_view.dart';
import 'package:jobera/views/loginViews/login_view.dart';
import 'package:jobera/views/profileViews/company/company_edit_info_view.dart';
import 'package:jobera/views/profileViews/company/company_profile_view.dart';
import 'package:jobera/views/profileViews/portfolio/edit_portfolio_view.dart';
import 'package:jobera/views/profileViews/user/certificate/user_add_certificate_view.dart';
import 'package:jobera/views/profileViews/user/certificate/user_view_certificates_view.dart';
import 'package:jobera/views/profileViews/portfolio/add_portfolio_view.dart';
import 'package:jobera/views/profileViews/portfolio/view_portfolios_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_education_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_info_view.dart';
import 'package:jobera/views/profileViews/user/user_edit_skills_view.dart';
import 'package:jobera/views/profileViews/user/user_profile_view.dart';
import 'package:jobera/views/registerViews/register_view.dart';
import 'package:jobera/views/appViews/settings_view.dart';
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
    name: '/userViewCertificates',
    page: () => UserEditCertificatesView(),
  ),
  GetPage(
    name: '/userAddCertificate',
    page: () => UserAddCertificateView(),
  ),
  GetPage(
    name: '/viewPortfolios',
    page: () => ViewPortfoliosView(),
  ),
  GetPage(
    name: '/addPortfolio',
    page: () => AddPortfolioView(),
  ),
  GetPage(
    name: '/editPortfolio',
    page: () => EditPortfolioView(),
  ),
  GetPage(
    name: '/wallet',
    page: () => WalletView(),
  ),
  GetPage(
    name: '/chats',
    page: () => ChatsView(),
  ),
  GetPage(
    name: '/jobFeed',
    page: () => JobFeedView(),
  ),
  GetPage(
    name: '/regularJobs',
    page: () => RegularJobsView(),
  ),
  GetPage(
    name: '/freelancingJobs',
    page: () => FreelancingJobsView(),
  ),
  GetPage(
    name: '/regularJobDetails',
    page: () => RegularJobDetailsView(),
  ),
  GetPage(
    name: '/regularJobsFilter',
    page: () => RegularJobsFilterView(),
  ),
  GetPage(
    name: '/freelancingJobsFilter',
    page: () => FreelancingJobsFilterView(),
  ),
  GetPage(
    name: '/applyRegularJob',
    page: () => ApplyRegularJobView(),
  ),
  GetPage(
    name: '/applyFreelancingJob',
    page: () => ApplyFreelancingJobView(),
  ),
  GetPage(
    name: '/freelancingJobDetails',
    page: () => FreelancingJobDetailsView(),
  ),
  GetPage(
    name: '/chat',
    page: () => ChatView(),
  ),
  GetPage(
    name: '/postJob',
    page: () => PostJobView(),
  ),
  GetPage(
    name: '/notifications',
    page: () => NotificationsView(),
  ),
  GetPage(
    name: '/manage',
    page: () => const ManageView(),
  ),
];
