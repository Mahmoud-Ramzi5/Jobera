import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/views/registerViews/company/company_register_view.dart';
import 'package:jobera/views/registerViews/user/user_register_view.dart';

class RegisterView extends StatelessWidget {
  const RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: TitleText(text: '4'.tr)),
      body: DefaultTabController(
        length: 2,
        initialIndex: 0,
        child: Scaffold(
          appBar: TabBar(
            tabs: <Widget>[
              Tab(
                icon: const Icon(
                  Icons.person,
                ),
                text: '2'.tr,
              ),
              Tab(
                icon: const Icon(
                  Icons.business,
                ),
                text: '3'.tr,
              ),
            ],
          ),
          body: TabBarView(
            children: [
              UserRegisterView(),
              CompanyRegisterView(),
            ],
          ),
        ),
      ),
    );
  }
}
