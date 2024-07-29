import 'package:flutter/material.dart';
import 'package:jobera/customWidgets/custom_containers.dart';
import 'package:jobera/customWidgets/custom_image.dart';
import 'package:jobera/customWidgets/texts.dart';

class RegularJobComponent extends StatelessWidget {
  final String? photo;
  final String jobTitle;
  final String jobType;
  final String publishedBy;
  final DateTime date;
  final double salary;
  final void Function()? onPressed;

  const RegularJobComponent({
    super.key,
    required this.photo,
    required this.jobTitle,
    required this.jobType,
    required this.publishedBy,
    required this.date,
    required this.salary,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: ProfilePhotoContainer(
                  child: photo != null
                      ? CustomImage(
                          path: photo.toString(),
                        )
                      : Icon(
                          Icons.work,
                          color: Colors.lightBlue.shade900,
                          size: 100,
                        ),
                ),
              ),
              IconButton(
                onPressed: onPressed,
                icon: Icon(
                  Icons.bookmark_border,
                  color: Colors.lightBlue.shade900,
                  size: 40,
                ),
              ),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Job Title: ',
              ),
              Flexible(child: LabelText(text: jobTitle)),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Job Type: ',
              ),
              LabelText(text: jobType)
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Published By: ',
              ),
              Flexible(child: LabelText(text: publishedBy))
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Date: ',
              ),
              LabelText(text: '${date.day}/${date.month}/${date.year}')
            ],
          ),
          Row(
            children: [
              const BodyText(text: 'Salary: '),
              LabelText(
                text: '$salary\$',
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class FreelancingJobComponent extends StatelessWidget {
  final String? photo;
  final String jobTitle;
  final String jobType;
  final String publishedBy;
  final DateTime date;
  final double minOffer;
  final double maxOffer;
  final void Function()? onPressed;

  const FreelancingJobComponent({
    super.key,
    required this.photo,
    required this.jobTitle,
    required this.jobType,
    required this.publishedBy,
    required this.date,
    required this.minOffer,
    required this.maxOffer,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: ProfilePhotoContainer(
                  child: photo != null
                      ? CustomImage(
                          path: photo.toString(),
                        )
                      : Icon(
                          Icons.laptop,
                          color: Colors.lightBlue.shade900,
                          size: 100,
                        ),
                ),
              ),
              IconButton(
                onPressed: onPressed,
                icon: Icon(
                  Icons.bookmark_border,
                  color: Colors.lightBlue.shade900,
                  size: 40,
                ),
              ),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Job Title: ',
              ),
              Flexible(child: LabelText(text: jobTitle))
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Job Type: ',
              ),
              LabelText(text: jobType),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Published By: ',
              ),
              Flexible(child: LabelText(text: publishedBy)),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Date: ',
              ),
              LabelText(text: '${date.day}/${date.month}/${date.year}'),
            ],
          ),
          Row(
            children: [
              const BodyText(
                text: 'Offer range: ',
              ),
              LabelText(text: '$minOffer\$-$maxOffer\$'),
            ],
          ),
        ],
      ),
    );
  }
}
