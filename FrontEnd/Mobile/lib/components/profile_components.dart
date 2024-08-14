import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/texts.dart';

class UserBasicInfoComponent extends StatelessWidget {
  final String gender;
  final String email;
  final String phoneNumber;
  final String state;
  final String country;
  final DateTime date;
  final bool isOtherUserProfile;

  const UserBasicInfoComponent({
    super.key,
    required this.gender,
    required this.email,
    required this.phoneNumber,
    required this.state,
    required this.country,
    required this.date,
    required this.isOtherUserProfile,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            BodyText(text: '169'.tr),
            Flexible(
              child: LabelText(
                text: gender,
              ),
            ),
          ],
        ),
        if (!isOtherUserProfile)
          Row(
            children: [
              BodyText(text: '6'.tr),
              Flexible(
                child: LabelText(text: email),
              ),
            ],
          ),
        if (!isOtherUserProfile)
          Row(
            children: [
              BodyText(text: '9'.tr),
              Flexible(child: LabelText(text: phoneNumber)),
            ],
          ),
        Row(
          children: [
            BodyText(text: '110'.tr),
            Flexible(child: LabelText(text: '$state - $country')),
          ],
        ),
        Row(
          children: [
            BodyText(text: '170'.tr),
            Flexible(
              child: LabelText(text: '${date.day}/${date.month}/${date.year}'),
            ),
          ],
        ),
      ],
    );
  }
}

class CompanyBasicInfoComponent extends StatelessWidget {
  final String field;
  final String email;
  final String phoneNumber;
  final String state;
  final String country;
  final DateTime date;
  final bool isOtherUserProfile;

  const CompanyBasicInfoComponent({
    super.key,
    required this.field,
    required this.email,
    required this.phoneNumber,
    required this.state,
    required this.country,
    required this.date,
    required this.isOtherUserProfile,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            BodyText(text: '40'.tr),
            Flexible(
              child: LabelText(
                text: field,
              ),
            ),
          ],
        ),
        if (!isOtherUserProfile)
          Row(
            children: [
              BodyText(text: '6'.tr),
              Flexible(
                child: LabelText(text: email),
              ),
            ],
          ),
        if (!isOtherUserProfile)
          Row(
            children: [
              BodyText(text: '9'.tr),
              Flexible(child: LabelText(text: phoneNumber)),
            ],
          ),
        Row(
          children: [
            BodyText(text: '110'.tr),
            Flexible(child: LabelText(text: '$state - $country')),
          ],
        ),
        Row(
          children: [
            BodyText(text: '171'.tr),
            Flexible(
              child: LabelText(text: '${date.day}/${date.month}/${date.year}'),
            ),
          ],
        ),
      ],
    );
  }
}

class EducationComponent extends StatelessWidget {
  final String level;
  final String field;
  final String school;
  final DateTime startDate;
  final DateTime endDate;
  final String? certificate;
  final void Function()? onPressed;

  const EducationComponent({
    super.key,
    required this.level,
    required this.field,
    required this.school,
    required this.startDate,
    required this.endDate,
    required this.certificate,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            BodyText(text: '39'.tr),
            Flexible(
              child: LabelText(
                text: level.replaceAllMapped('_', (match) => ' ').toLowerCase(),
              ),
            )
          ],
        ),
        Row(
          children: [
            BodyText(text: '40'.tr),
            Flexible(
              child: LabelText(text: field),
            )
          ],
        ),
        Row(
          children: [
            BodyText(text: '41'.tr),
            Flexible(
              child: LabelText(text: school),
            )
          ],
        ),
        Row(
          children: [
            BodyText(text: '42'.tr),
            Flexible(
              child: LabelText(
                text: '${startDate.day}/${startDate.month}/${startDate.year}',
              ),
            ),
          ],
        ),
        Row(
          children: [
            BodyText(text: '43'.tr),
            Flexible(
              child: LabelText(
                text: '${endDate.day}/${endDate.month}/${endDate.year}',
              ),
            ),
          ],
        ),
        Row(
          children: [
            BodyText(text: '172'.tr),
            Flexible(
              child: LabelText(
                text: certificate != null
                    ? certificate!.split('/').last
                    : '156'.tr,
              ),
            ),
            IconButton(
              onPressed: onPressed,
              icon: Icon(
                Icons.file_open,
                color: Colors.lightBlue.shade900,
              ),
            )
          ],
        )
      ],
    );
  }
}

class PortfolioComponent extends StatelessWidget {
  final String? photo;
  final String title;

  const PortfolioComponent({
    super.key,
    this.photo,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ListContainer(
        color: Colors.lightBlue.shade900,
        child: Column(
          children: [
            photo == null
                ? Icon(
                    Icons.photo,
                    color: Colors.orange.shade800,
                    size: 100,
                  )
                : CustomImage(
                    path: photo.toString(),
                    height: 100,
                  ),
            ListContainer(
              color: Colors.orange.shade800,
              width: 100,
              child: Center(
                child: BodyText(
                  text: title,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
