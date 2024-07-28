import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/texts.dart';

class JobDetailsView extends StatelessWidget {
  const JobDetailsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Job Details'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              const Center(
                child: ProfilePhotoContainer(
                  height: 200,
                  width: 200,
                  child: CustomImage(
                    path: '',
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.all(10),
                child: InfoContainer(
                  name: 'Details',
                  widget: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        children: [
                          BodyText(text: 'Job Title: '),
                          LabelText(text: 'test')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Job Type: '),
                          LabelText(text: 'test')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Description: '),
                          LabelText(text: 'test')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Location: '),
                          LabelText(text: 'test')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Deadline: '),
                          LabelText(text: '3/3/2003')
                        ],
                      ),
                      //TODO:add condition for freelancing
                      Row(
                        children: [
                          BodyText(text: 'Salary: '),
                          LabelText(text: '5000')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Avg offer: '),
                          LabelText(text: '5000')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Job owner: '),
                          LabelText(text: 'test')
                        ],
                      ),
                      Row(
                        children: [
                          BodyText(text: 'Publish Date: '),
                          LabelText(text: '3/3/2003')
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: InfoContainer(
                  name: 'Required Skills',
                  widget: ListView.builder(
                    itemCount: 4,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                      final firstIndex = index * 2;
                      final secondIndex = firstIndex + 1;
                      return Row(
                        children: [
                          if (firstIndex < 4)
                            const Expanded(
                              flex: 1,
                              child: Padding(
                                padding: EdgeInsets.all(5),
                                child: Chip(
                                  label: BodyText(
                                    text: 'Skill',
                                  ),
                                ),
                              ),
                            ),
                          if (secondIndex < 4)
                            const Expanded(
                              flex: 1,
                              child: Padding(
                                padding: EdgeInsets.all(5),
                                child: Chip(
                                  label: BodyText(
                                    text: 'Skill',
                                  ),
                                ),
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
