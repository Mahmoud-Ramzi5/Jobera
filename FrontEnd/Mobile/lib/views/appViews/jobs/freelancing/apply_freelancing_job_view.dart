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
        title: const TitleText(text: 'Make Offer'),
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
                labelText: 'Comment',
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
                labelText: 'Offer',
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
                  name: 'Your Share:',
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
              child: const LabelText(text: 'send'),
            ),
          ],
        ),
      ),
    );
  }
}
