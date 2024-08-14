import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/freelancing/freelancing_job_details_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';

class ApplyFreelancingJobView extends StatelessWidget {
  final FreelancingJobDetailsController _freelancingJobDetailsController =
      Get.find<FreelancingJobDetailsController>();

  ApplyFreelancingJobView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '123'.tr),
      ),
      body: Form(
        key: _freelancingJobDetailsController.formField,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: _freelancingJobDetailsController.commentController,
                textInputType: TextInputType.text,
                obsecureText: false,
                labelText: '124'.tr,
                icon: Icons.abc,
                validator: (p0) => Validation().validateRequiredField(p0),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: _freelancingJobDetailsController.offerController,
                textInputType: TextInputType.number,
                obsecureText: false,
                labelText: '89'.tr,
                icon: Icons.monetization_on,
                validator: (p0) => Validation().validateOffer(
                  p0,
                  _freelancingJobDetailsController.freelancingJob.minOffer,
                  _freelancingJobDetailsController.freelancingJob.maxOffer,
                ),
                onChanged: (p0) =>
                    _freelancingJobDetailsController.calculateShare(),
              ),
            ),
            GetBuilder<FreelancingJobDetailsController>(
              builder: (controller) => Padding(
                padding: const EdgeInsets.all(10),
                child: InfoContainer(
                  name: '129'.tr,
                  widget: LabelText(
                    text: '${controller.share}\$',
                  ),
                ),
              ),
            ),
            OutlinedButton(
              onPressed: () {
                if (_freelancingJobDetailsController.formField.currentState
                        ?.validate() ==
                    true) {
                  _freelancingJobDetailsController.applyFreelancingJob(
                    _freelancingJobDetailsController.freelancingJob.defJobId,
                    _freelancingJobDetailsController.commentController.text,
                    _freelancingJobDetailsController.offerController.text,
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
