import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/controllers/appControllers/home_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/list_tiles.dart';
import 'package:jobera/views/appViews/chats/chats_view.dart';
import 'package:jobera/views/appViews/jobs/freelancing/freelancing_jobs_view.dart';
import 'package:jobera/views/appViews/jobs/regular/regular_jobs_view.dart';
import 'package:jobera/views/appViews/job_feed_view.dart';

class HomeView extends StatelessWidget {
  final HomeController _homeController = Get.put(HomeController());

  HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(
          actions: [
            TextButton(
              onPressed: () => Get.toNamed('/postJob'),
              child: LabelText(text: '94'.tr),
            ),
          ],
        ),
        drawer: Drawer(
          child: ListView(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Row(
                  children: [
                    Column(
                      children: [
                        GetBuilder<HomeController>(
                          builder: (controller) => Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ProfilePhotoContainer(
                                height: 150,
                                width: 150,
                                child: controller.photo == null
                                    ? controller.isCompany
                                        ? Icon(
                                            Icons.business,
                                            size: 100,
                                            color: Colors.lightBlue.shade900,
                                          )
                                        : Icon(
                                            Icons.person,
                                            size: 100,
                                            color: Colors.lightBlue.shade900,
                                          )
                                    : CustomImage(
                                        path: controller.photo.toString(),
                                      ),
                              ),
                              BodyText(text: controller.name),
                              LabelText(text: controller.email),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const Divider(
                height: 1,
              ),
              MenuListTile(
                title: '95'.tr,
                icon: Icons.person,
                onTap: () {
                  if (_homeController.isCompany) {
                    Get.toNamed('/companyProfile');
                  } else {
                    Get.toNamed('/userProfile');
                  }
                },
              ),
              MenuListTile(
                title: '71'.tr,
                icon: Icons.wallet,
                onTap: () => Get.toNamed('/wallet'),
              ),
              GetBuilder<HomeController>(
                builder: (controller) => MenuListTile(
                  title: '81'.tr,
                  count: controller.notificationsCount,
                  icon: Icons.notifications_none_rounded,
                  onTap: () => Get.toNamed('/notifications'),
                ),
              ),
              MenuListTile(
                title: '185'.tr,
                icon: Icons.view_kanban,
                onTap: () {
                  _homeController.inManage = true;
                  Get.toNamed('/manage');
                },
              ),
              MenuListTile(
                title: '68'.tr,
                icon: Icons.settings,
                onTap: () => Get.toNamed('/settings'),
              ),
              MenuListTile(
                title: '96'.tr,
                icon: Icons.logout,
                onTap: () => Dialogs().showLogoutDialog(
                  () => _homeController.logout(),
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: Padding(
          padding: const EdgeInsets.all(2),
          child: TabBar(
            tabs: <Widget>[
              Tab(
                icon: const Icon(
                  Icons.newspaper,
                ),
                text: '97'.tr,
              ),
              Tab(
                icon: const Icon(
                  Icons.work,
                ),
                text: '98'.tr,
              ),
              Tab(
                icon: const Icon(
                  Icons.laptop,
                ),
                text: '99'.tr,
              ),
              Tab(
                icon: const Icon(
                  Icons.chat,
                ),
                text: '100'.tr,
              ),
            ],
          ),
        ),
        body: RefreshIndicator(
          key: _homeController.refreshIndicatorKey,
          onRefresh: () => _homeController.fetchUser(),
          child: TabBarView(
            children: [
              JobFeedView(),
              RegularJobsView(),
              FreelancingJobsView(),
              ChatsView()
            ],
          ),
        ),
      ),
    );
  }
}
