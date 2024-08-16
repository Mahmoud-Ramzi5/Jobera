import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/controllers/appControllers/jobs/post_job_controller.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_drop_down_button.dart';
import 'package:jobera/customWidgets/custom_text_field.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';
import 'package:jobera/customWidgets/validation.dart';
import 'package:jobera/models/country.dart';
import 'package:jobera/models/state.dart';

class PostJobView extends StatelessWidget {
  final PostJobController _postJobController = Get.put(PostJobController());

  PostJobView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TitleText(text: '94'.tr),
        actions: [
          TextButton(
            onPressed: () {
              if (_postJobController.formField.currentState?.validate() ==
                  true) {
                if (_postJobController.selectedJobType == 'regular') {
                  _postJobController.addRegJob(
                    _postJobController.jobTitleController.text,
                    _postJobController.descriptionController.text,
                    _postJobController.selectedCountry != null
                        ? _postJobController.selectedState!.stateId
                        : 0,
                    _postJobController.salaryController.text,
                    _postJobController.selectedWorkTime,
                    _postJobController.selectedSkills,
                    _postJobController.image,
                  );
                } else {
                  _postJobController.addFreelancingJob(
                    _postJobController.jobTitleController.text,
                    _postJobController.descriptionController.text,
                    _postJobController.selectedCountry != null
                        ? _postJobController.selectedState!.stateId
                        : 0,
                    _postJobController.minOfferController.text,
                    _postJobController.maxOfferController.text,
                    _postJobController.selectedDate,
                    _postJobController.selectedSkills,
                    _postJobController.image,
                  );
                }
              }
            },
            child: LabelText(text: '101'.tr),
          )
        ],
      ),
      body: GetBuilder<PostJobController>(
        builder: (controller) => controller.loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                child: Form(
                  key: controller.formField,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: ProfilePhotoContainer(
                          height: 150,
                          width: 150,
                          child: controller.image == null
                              ? GestureDetector(
                                  onTap: () => Dialogs().addPhotoDialog(
                                    () => controller.takePhoto(),
                                    () => controller.addPhoto(),
                                    () => controller.removePhoto(),
                                  ),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.add_a_photo,
                                        color: Colors.lightBlue.shade900,
                                      ),
                                      BodyText(text: '62'.tr)
                                    ],
                                  ),
                                )
                              : GestureDetector(
                                  child: Image.memory(controller.displayImage),
                                  onTap: () => Dialogs().addPhotoDialog(
                                    () => controller.takePhoto(),
                                    () => controller.addPhoto(),
                                    () => controller.removePhoto(),
                                  ),
                                ),
                        ),
                      ),
                      if (controller.homeController.isCompany)
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: Center(
                            child: CustomDropDownButton(
                              value: controller.selectedJobType,
                              items: controller.jobTypes.entries.map((entry) {
                                return DropdownMenuItem<String>(
                                  value: entry.value,
                                  child: BodyText(
                                    text: entry.key,
                                  ),
                                );
                              }).toList(),
                              onChanged: (p0) => controller.changeJobType(p0),
                              text: '102'.tr,
                            ),
                          ),
                        ),
                      if (controller.selectedJobType == 'regular')
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            RadioMenuButton(
                              value: 'FullTime',
                              groupValue: controller.selectedWorkTime,
                              onChanged: (value) =>
                                  controller.changeWorkTime(value!),
                              child: BodyText(text: '103'.tr),
                            ),
                            RadioMenuButton(
                              value: 'PartTime',
                              groupValue: controller.selectedWorkTime,
                              onChanged: (value) =>
                                  controller.changeWorkTime(value!),
                              child: BodyText(text: '104'.tr),
                            ),
                          ],
                        ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.jobTitleController,
                          textInputType: TextInputType.text,
                          obsecureText: false,
                          icon: Icons.abc,
                          labelText: '105'.tr,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: CustomTextField(
                          controller: controller.descriptionController,
                          textInputType: TextInputType.text,
                          obsecureText: false,
                          icon: Icons.abc,
                          labelText: '26'.tr,
                          validator: (p0) =>
                              Validation().validateRequiredField(p0),
                        ),
                      ),
                      if (controller.selectedJobType == 'regular')
                        Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: CustomTextField(
                                controller: controller.salaryController,
                                textInputType: TextInputType.number,
                                obsecureText: false,
                                icon: Icons.monetization_on,
                                labelText: 'Salary',
                                validator: (p0) =>
                                    Validation().validateNumber(p0),
                                onChanged: (p0) => controller.calculateShare(),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: InfoContainer(
                                name: '194'.tr,
                                widget: LabelText(
                                  text: '${controller.tax}\$',
                                ),
                              ),
                            ),
                          ],
                        ),
                      if (controller.selectedJobType == 'freelancing')
                        Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: CustomTextField(
                                controller: controller.minOfferController,
                                textInputType: TextInputType.number,
                                obsecureText: false,
                                icon: Icons.monetization_on,
                                labelText: '106'.tr,
                                validator: (p0) =>
                                    Validation().validateNumber(p0),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: CustomTextField(
                                controller: controller.maxOfferController,
                                textInputType: TextInputType.number,
                                obsecureText: false,
                                icon: Icons.monetization_on,
                                labelText: '107'.tr,
                                validator: (p0) =>
                                    Validation().validateNumber(p0),
                              ),
                            ),
                          ],
                        ),
                      if (controller.selectedJobType == 'freelancing')
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            BodyText(text: '108'.tr),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: DateContainer(
                                widget: GestureDetector(
                                  onTap: () => controller.selectDate(context),
                                  child: BodyText(
                                    text: "${controller.selectedDate}"
                                        .split(' ')[0],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          RadioMenuButton(
                            value: 'Remotely',
                            groupValue: controller.selectedLocation,
                            onChanged: (value) =>
                                controller.changeLocation(value!),
                            child: BodyText(text: '109'.tr),
                          ),
                          RadioMenuButton(
                            value: 'Location',
                            groupValue: controller.selectedLocation,
                            onChanged: (value) =>
                                controller.changeLocation(value!),
                            child: BodyText(text: '110'.tr),
                          ),
                        ],
                      ),
                      if (controller.selectedLocation == 'Location')
                        Column(
                          children: [
                            CustomDropDownButton(
                              value: controller.selectedCountry,
                              items: controller.countries
                                  .map<DropdownMenuItem<Country>>(
                                    (country) => DropdownMenuItem<Country>(
                                      value: country,
                                      child:
                                          BodyText(text: country.countryName),
                                    ),
                                  )
                                  .toList(),
                              onChanged: (p0) async =>
                                  await controller.selectCountry(p0),
                              text: '13'.tr,
                            ),
                            CustomDropDownButton(
                              value: controller.selectedState,
                              items: controller.states
                                  .map<DropdownMenuItem<States>>(
                                    (state) => DropdownMenuItem<States>(
                                      value: state,
                                      child: BodyText(text: state.stateName),
                                    ),
                                  )
                                  .toList(),
                              onChanged: (p0) => controller.selectState(p0!),
                              text: '14'.tr,
                            ),
                          ],
                        ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: '63'.tr,
                          widget: ListView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount:
                                (controller.selectedSkills.length / 2).ceil(),
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              final firstIndex = index * 2;
                              final secondIndex = firstIndex + 1;
                              return Row(
                                children: [
                                  if (firstIndex <
                                      controller.selectedSkills.length)
                                    Expanded(
                                      flex: 1,
                                      child: Padding(
                                        padding: const EdgeInsets.all(5),
                                        child: InputChip(
                                          deleteIcon: const Icon(Icons.cancel),
                                          onDeleted: () {
                                            controller.deleteSkill(controller
                                                .selectedSkills[firstIndex]);
                                          },
                                          label: BodyText(
                                            text: controller
                                                .selectedSkills[firstIndex]
                                                .name,
                                          ),
                                        ),
                                      ),
                                    ),
                                  if (secondIndex <
                                      controller.selectedSkills.length)
                                    Expanded(
                                      flex: 1,
                                      child: Padding(
                                        padding: const EdgeInsets.all(5),
                                        child: InputChip(
                                          deleteIcon: const Icon(Icons.cancel),
                                          onDeleted: () {
                                            controller.deleteSkill(controller
                                                .selectedSkills[secondIndex]);
                                          },
                                          label: BodyText(
                                            text: controller
                                                .selectedSkills[secondIndex]
                                                .name,
                                          ),
                                        ),
                                      ),
                                    ),
                                ],
                              );
                            },
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: InfoContainer(
                          name: '30'.tr,
                          widget: ExpansionTile(
                            title: BodyText(text: '64'.tr),
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(10),
                                child: SearchBar(
                                  hintText: '36'.tr,
                                  leading: Icon(
                                    Icons.search,
                                    color: Colors.lightBlue.shade900,
                                  ),
                                  onChanged: (value) =>
                                      controller.searchSkills(value),
                                ),
                              ),
                              ListView.builder(
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount:
                                    (controller.skills.length / 2).ceil(),
                                shrinkWrap: true,
                                itemBuilder: (context, index) {
                                  final firstIndex = index * 2;
                                  final secondIndex = firstIndex + 1;
                                  return Row(
                                    children: [
                                      if (firstIndex < controller.skills.length)
                                        Expanded(
                                          flex: 1,
                                          child: Padding(
                                            padding: const EdgeInsets.all(5),
                                            child: InputChip(
                                              label: BodyText(
                                                text: controller
                                                    .skills[firstIndex].name,
                                              ),
                                              onPressed: () {
                                                controller.addToOMySkills(
                                                  controller.skills[firstIndex],
                                                );
                                              },
                                            ),
                                          ),
                                        ),
                                      if (secondIndex <
                                          controller.skills.length)
                                        Expanded(
                                          flex: 1,
                                          child: Padding(
                                            padding: const EdgeInsets.all(5),
                                            child: InputChip(
                                              label: BodyText(
                                                text: controller
                                                    .skills[secondIndex].name,
                                              ),
                                              onPressed: () {
                                                controller.addToOMySkills(
                                                  controller
                                                      .skills[secondIndex],
                                                );
                                              },
                                            ),
                                          ),
                                        ),
                                    ],
                                  );
                                },
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
