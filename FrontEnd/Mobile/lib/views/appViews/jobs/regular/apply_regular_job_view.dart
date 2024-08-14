import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/regular/regular_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';

class ApplyRegularJobView extends StatelessWidget {
  final RegularJobDetailsController _regularJobDetailsController =
      Get.find<RegularJobDetailsController>();
  ApplyRegularJobView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '123'.tr),
      ),
      body: Form(
        key: _regularJobDetailsController.formField,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: _regularJobDetailsController.commentController,
                textInputType: TextInputType.text,
                obsecureText: false,
                labelText: '124'.tr,
                icon: Icons.abc,
                validator: (p0) => Validation().validateRequiredField(p0),
              ),
            ),
            OutlinedButton(
              onPressed: () {
                if (_regularJobDetailsController.formField.currentState
                        ?.validate() ==
                    true) {
                  _regularJobDetailsController.applyRegJob(
                    _regularJobDetailsController.regularJob.defJobId,
                    _regularJobDetailsController.commentController.text,
                  );
                }
              },
              child: LabelText(text: '23'.tr),
            ),
          ],
        ),
      ),
    );
  }
}
