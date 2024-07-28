import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/dialogs.dart';
import 'package:jobera/customWidgets/texts.dart';

class PhotoComponent extends StatelessWidget {
  final String? photo;
  final void Function()? takePhoto;
  final void Function()? pickPhoto;
  final void Function()? removePhoto;

  const PhotoComponent({
    super.key,
    this.photo,
    this.takePhoto,
    this.pickPhoto,
    this.removePhoto,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        ProfileBackgroundContainer(
          child: photo == null
              ? Icon(
                  Icons.person,
                  size: 100,
                  color: Colors.lightBlue.shade900,
                )
              : CustomImage(
                  path: photo.toString(),
                ),
          onPressed: () => Dialogs().addPhotoDialog(
            takePhoto,
            pickPhoto,
            removePhoto,
          ),
        ),
      ],
    );
  }
}

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
            BodyText(text: isCompany ? 'Field: ' : 'Gender: '),
            Flexible(
              child: LabelText(
                text: isCompany ? fieldOrGender : fieldOrGender.toLowerCase(),
              ),
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Email: '),
            Flexible(
              child: LabelText(text: email),
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Phone Number: '),
            Flexible(child: LabelText(text: phoneNumber)),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Location: '),
            Flexible(child: LabelText(text: '$state - $country')),
          ],
        ),
        Row(
          children: [
            BodyText(text: isCompany ? 'Founding Date: ' : 'BirthDate: '),
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
            const BodyText(text: 'Level: '),
            Flexible(
              child: LabelText(
                text: level.replaceAllMapped('_', (match) => ' ').toLowerCase(),
              ),
            )
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Field: '),
            Flexible(
              child: LabelText(text: field),
            )
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'School: '),
            Flexible(
              child: LabelText(text: school),
            )
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Start Date: '),
            Flexible(
              child: LabelText(
                text: '${startDate.day}/${startDate.month}/${startDate.year}',
              ),
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'End Date: '),
            Flexible(
              child: LabelText(
                text: '${endDate.day}/${endDate.month}/${endDate.year}',
              ),
            ),
          ],
        ),
        Row(
          children: [
            const BodyText(text: 'Certificate: '),
            Flexible(
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
