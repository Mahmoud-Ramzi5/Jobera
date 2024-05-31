import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';
import 'package:jobera/controllers/profileControllers/user/user_edit_certificates_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';

class UserEditCertificatesView extends StatelessWidget {
  final UserEditCertificatesController _editController =
      Get.put(UserEditCertificatesController());

  UserEditCertificatesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const TitleText(text: 'Edit Certificates'),
      ),
      body: SingleChildScrollView(
          child: Column(
        children: [
          ListView.builder(
            itemCount:
                _editController.profileController.user.certificates!.length,
            shrinkWrap: true,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.all(10),
                child: ListContainer(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          children: [
                            Row(
                              children: [
                                const BodyText(text: 'Name: '),
                                LabelText(
                                  text: _editController.profileController.user
                                      .certificates![index].name,
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Organization: '),
                                LabelText(
                                  text: _editController.profileController.user
                                      .certificates![index].organization,
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Date: '),
                                LabelText(
                                  text: _editController.profileController.user
                                      .certificates![index].date,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          IconButton(
                            onPressed: () {},
                            icon: Icon(
                              Icons.edit,
                              color: Colors.lightBlue.shade900,
                            ),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(
                              Icons.cancel,
                              color: Colors.red,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  onTap: () {},
                ),
              );
            },
          )
        ],
      )),
    );
  }
}