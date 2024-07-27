import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobsView extends StatelessWidget {
  const RegularJobsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            ListView.builder(
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 10,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () {
                    print('tap');
                  },
                  child: Card(
                    margin: const EdgeInsets.all(10),
                    shape: RoundedRectangleBorder(
                      borderRadius: const BorderRadius.all(
                        Radius.circular(10),
                      ),
                      side: BorderSide(
                        //TODO:change color according to job type
                        color: Colors.lightBlue.shade900,
                        width: 2,
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Padding(
                            padding: EdgeInsets.all(10),
                            //TODO:add icon if ther is no photo
                            child: ProfilePhotoContainer(
                              height: 100,
                              width: 100,
                              child: CustomImage(
                                path: '',
                              ),
                            ),
                          ),
                          const Expanded(
                            child: Padding(
                              padding: EdgeInsets.all(10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  LabelText(
                                    text: 'Job Title:',
                                  ),
                                  LabelText(
                                    text: 'Job Type:',
                                  ),
                                  //TODO:add link tp profile
                                  LabelText(
                                    text: 'Published By:',
                                  ),
                                  LabelText(
                                    text: 'Date:',
                                  ),
                                  BodyText(
                                    text: 'Salary: 50000\$',
                                  ),
                                ],
                              ),
                            ),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: Icon(
                              Icons.bookmark_border,
                              color: Colors.lightBlue.shade900,
                              size: 40,
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
