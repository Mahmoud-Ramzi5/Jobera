import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/views/appViews/jobs/manage/manage_bookmarks_view.dart';
import 'package:jobera/views/appViews/jobs/manage/manage_offers_view.dart';
import 'package:jobera/views/appViews/jobs/manage/manage_posts_view.dart';

class ManageView extends StatelessWidget {
  const ManageView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(
          title: TitleText(text: '185'.tr),
        ),
        bottomNavigationBar: TabBar(
          dividerColor: Colors.lightBlue.shade900,
          tabs: <Widget>[
            Tab(
              text: '186'.tr,
            ),
            Tab(
              text: '187'.tr,
            ),
            Tab(
              text: '188'.tr,
            ),
          ],
        ),
        body: TabBarView(
          children: [
            ManagePostsView(),
            ManageOffersView(),
            ManageBookmarksView(),
          ],
        ),
      ),
    );
  }
}
