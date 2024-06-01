import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/dialogs.dart';
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
        title: const TitleText(text: 'View Certificates'),
        actions: [
          IconButton(
            onPressed: () => Get.toNamed('/userAddCertificate'),
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
      body: RefreshIndicator(
        key: _editController.refreshIndicatorKey,
        onRefresh: () => _editController.fetchCertificates(),
        child: GetBuilder<UserEditCertificatesController>(
          builder: (controller) => ListView.builder(
            itemCount: controller.certificates.length,
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
                                  text: controller.certificates[index].name,
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Organization: '),
                                LabelText(
                                  text: controller
                                      .certificates[index].organization,
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                const BodyText(text: 'Date: '),
                                LabelText(
                                  text: controller.certificates[index].date,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          IconButton(
                            onPressed: () =>
                                controller.generalController.fetchFile(
                              controller.certificates[index].name,
                              'certificate',
                            ),
                            icon: Icon(
                              Icons.file_open,
                              color: Colors.lightBlue.shade900,
                            ),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: Icon(
                              Icons.edit,
                              color: Colors.lightBlue.shade900,
                            ),
                          ),
                          IconButton(
                            onPressed: () => Dialogs().confirmDialog(
                              'Notice:',
                              'Are you sure you want to delete File?',
                              () {
                                controller.deleteCertificate(
                                  controller.certificates[index].id,
                                );
                                Get.back();
                              },
                            ),
                            icon: const Icon(
                              Icons.cancel,
                              color: Colors.red,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
