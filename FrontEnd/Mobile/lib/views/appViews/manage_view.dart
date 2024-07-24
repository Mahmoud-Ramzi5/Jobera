import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/texts.dart';

class ManageView extends StatelessWidget {
  const ManageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const TitleText(text: 'Manage')),
      body: const DefaultTabController(
        length: 3,
        initialIndex: 0,
        child: Scaffold(
          appBar: TabBar(
            tabs: <Widget>[
              Tab(
                icon: Icon(
                  Icons.bookmark,
                ),
                text: "Bookmarks",
              ),
              Tab(
                icon: Icon(
                  Icons.push_pin,
                ),
                text: "Posts",
              ),
              Tab(
                icon: Icon(
                  Icons.local_offer_sharp,
                ),
                text: "Offers",
              ),
            ],
          ),
          body: TabBarView(
            children: [
              Scaffold(
                body: Center(child: Text('under construction')),
              ),
              Scaffold(
                body: Center(child: Text('under construction')),
              ),
              Scaffold(
                body: Center(child: Text('under construction')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
