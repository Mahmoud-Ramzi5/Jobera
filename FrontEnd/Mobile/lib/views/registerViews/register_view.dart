import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/views/registerViews/company/company_register_view.dart';
import 'package:jobera/views/registerViews/user/user_register_view.dart';

class RegisterView extends StatelessWidget {
  const RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const TitleText(text: 'Register')),
      body: DefaultTabController(
        length: 2,
        initialIndex: 0,
        child: Scaffold(
          appBar: const TabBar(
            tabs: <Widget>[
              Tab(
                icon: Icon(
                  Icons.person,
                ),
                text: "User",
              ),
              Tab(
                icon: Icon(
                  Icons.business,
                ),
                text: "Company",
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
