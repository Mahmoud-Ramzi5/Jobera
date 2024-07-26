import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/texts.dart';

class BasicInfoComponent extends StatelessWidget {
  final String fieldOrGender;
  final String email;
  final String phoneNumber;
  final String state;
  final String country;
  final DateTime date;
  final bool isCompany;

  const BasicInfoComponent({
    super.key,
    required this.fieldOrGender,
    required this.email,
    required this.phoneNumber,
    required this.state,
    required this.country,
    required this.isCompany,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            BodyText(text: isCompany ? 'Field: ' : 'Gender'),
            LabelText(
              text: isCompany ? fieldOrGender : fieldOrGender.toLowerCase(),
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Email: '),
            LabelText(text: email),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Phone Number: '),
            LabelText(text: phoneNumber),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Location: '),
            LabelText(text: '$state - $country'),
          ],
        ),
        Row(
          children: [
            Row(
              children: [
                BodyText(text: isCompany ? 'Founding Date: ' : 'BirthDate:'),
                LabelText(text: '${date.day}/${date.month}/${date.year}'),
              ],
            )
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
            const BodyText(text: 'Level: '),
            LabelText(
              text: level.replaceAllMapped('_', (match) => ' ').toLowerCase(),
            )
          ],
        ),
        Row(
          children: [const BodyText(text: 'Field: '), LabelText(text: field)],
        ),
        Row(
          children: [const BodyText(text: 'School: '), LabelText(text: school)],
        ),
        Row(
          children: [
            const BodyText(text: 'Start Date: '),
            LabelText(
              text: '${startDate.day}/${startDate.month}/${startDate.year}',
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'End Date: '),
            LabelText(
              text: '${endDate.day}/${endDate.month}/${endDate.year}',
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Certificate: '),
            Flexible(
              flex: 1,
              child: LabelText(
                text: certificate != null
                    ? certificate!.split('/').last
                    : 'No File',
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
