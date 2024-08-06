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
              child: const LabelText(text: 'Post Job'),
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
                title: "Profile",
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
                title: "Wallet",
                icon: Icons.wallet,
                onTap: () => Get.toNamed('/wallet'),
              ),
              MenuListTile(
                title: "Notifications",
                icon: Icons.notifications_none_rounded,
                onTap: () => Get.toNamed('/notifications'),
              ),
              MenuListTile(
                title: "Settings",
                icon: Icons.settings,
                onTap: () => Get.toNamed('/settings'),
              ),
              MenuListTile(
                title: "Logout",
                icon: Icons.logout,
                onTap: () => Dialogs().showLogoutDialog(
                  () => _homeController.logout(),
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: const Padding(
          padding: EdgeInsets.all(2),
          child: TabBar(
            tabs: <Widget>[
              Tab(
                icon: Icon(
                  Icons.newspaper,
                ),
                text: "Job Feed",
              ),
              Tab(
                icon: Icon(
                  Icons.work,
                ),
                text: "Regular",
              ),
              Tab(
                icon: Icon(
                  Icons.laptop,
                ),
                text: "Freelance",
              ),
              Tab(
                icon: Icon(
                  Icons.chat,
                ),
                text: "Chats",
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
