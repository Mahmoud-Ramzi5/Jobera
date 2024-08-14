import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
    return Column(
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
                        height: 100,
                        width: 100,
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
            BodyText(text: '105'.tr),
            Flexible(child: LabelText(text: jobTitle)),
          ],
        ),
        Row(
          children: [BodyText(text: '102'.tr), LabelText(text: jobType)],
        ),
        Row(
          children: [
            BodyText(text: '115'.tr),
            Flexible(child: LabelText(text: publishedBy))
          ],
        ),
        Row(
          children: [
            BodyText(text: '182'.tr),
            LabelText(text: '${date.day}/${date.month}/${date.year}')
          ],
        ),
        Row(
          children: [
            BodyText(text: '87'.tr),
            LabelText(text: '$salary\$'),
          ],
        ),
      ],
    );
  }
}

class RegularJobDetailsComponent extends StatelessWidget {
  final String jobTitle;
  final String jobType;
  final String description;
  final String? state;
  final String? country;
  final void Function()? onPressed;
  final String publishedBy;
  final DateTime publishDate;
  final double salary;

  const RegularJobDetailsComponent({
    super.key,
    required this.jobTitle,
    required this.jobType,
    required this.description,
    this.state,
    this.country,
    this.onPressed,
    required this.publishedBy,
    required this.publishDate,
    required this.salary,
  });

  @override
  Widget build(BuildContext context) {
    return InfoContainer(
      name: '118'.tr,
      widget: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            children: [
              BodyText(text: '105'.tr),
              Flexible(
                child: LabelText(text: jobTitle),
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '102'.tr),
              LabelText(text: jobType),
            ],
          ),
          Row(
            children: [
              BodyText(text: '26'.tr),
              Flexible(child: LabelText(text: description)),
            ],
          ),
          Row(
            children: [
              BodyText(text: '110'.tr),
              if (state != null)
                Flexible(
                  child: LabelText(text: '$country-$state'),
                )
              else
                LabelText(text: '109'.tr),
            ],
          ),
          Row(
            children: [
              BodyText(text: '115'.tr),
              Flexible(
                child: TextButton(
                  onPressed: onPressed,
                  child: Text(
                    publishedBy,
                    style: TextStyle(
                      color: Colors.orange.shade800,
                      decoration: TextDecoration.underline,
                      decorationColor: Colors.lightBlue.shade900,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '182'.tr),
              LabelText(
                text:
                    '${publishDate.day}/${publishDate.month}/${publishDate.year}',
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '87'.tr),
              LabelText(text: '$salary\$'),
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
  final DateTime publishDate;
  final DateTime deadline;
  final double minOffer;
  final double maxOffer;
  final void Function()? onPressed;

  const FreelancingJobComponent({
    super.key,
    required this.photo,
    required this.jobTitle,
    required this.jobType,
    required this.publishedBy,
    required this.publishDate,
    required this.deadline,
    required this.minOffer,
    required this.maxOffer,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
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
                        height: 100,
                        width: 100,
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
            BodyText(text: '105'.tr),
            Flexible(child: LabelText(text: jobTitle))
          ],
        ),
        Row(
          children: [
            BodyText(text: '102'.tr),
            LabelText(text: jobType),
          ],
        ),
        Row(
          children: [
            BodyText(text: '115'.tr),
            Flexible(child: LabelText(text: publishedBy)),
          ],
        ),
        Row(
          children: [
            BodyText(text: '182'.tr),
            LabelText(
                text:
                    '${publishDate.day}/${publishDate.month}/${publishDate.year}'),
          ],
        ),
        Row(
          children: [
            BodyText(text: '176'.tr),
            LabelText(
                text: '${deadline.day}/${deadline.month}/${deadline.year}'),
          ],
        ),
        Row(
          children: [
            BodyText(text: '173'.tr),
            LabelText(text: '$minOffer\$-$maxOffer\$'),
          ],
        ),
      ],
    );
  }
}

class FreelancingJobDetailsComponent extends StatelessWidget {
  final String jobTitle;
  final String jobType;
  final String description;
  final String? state;
  final String? country;
  final DateTime deadline;
  final void Function()? onPressed;
  final String publishedBy;
  final DateTime publishDate;
  final double minOffer;
  final double maxOffer;
  final double? avgOffer;

  const FreelancingJobDetailsComponent({
    super.key,
    required this.jobTitle,
    required this.jobType,
    required this.description,
    this.state,
    this.country,
    required this.deadline,
    this.onPressed,
    required this.publishedBy,
    required this.publishDate,
    required this.minOffer,
    required this.maxOffer,
    this.avgOffer,
  });

  @override
  Widget build(BuildContext context) {
    return InfoContainer(
      name: '118'.tr,
      widget: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            children: [
              BodyText(text: '105'.tr),
              Flexible(
                child: LabelText(text: jobTitle),
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '102'.tr),
              LabelText(text: jobType),
            ],
          ),
          Row(
            children: [
              BodyText(text: '26'.tr),
              Flexible(
                child: LabelText(text: description),
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '110'.tr),
              if (state != null)
                Flexible(
                  child: LabelText(text: '$country-$state'),
                )
              else
                LabelText(text: '109'.tr)
            ],
          ),
          Row(
            children: [
              BodyText(text: '176'.tr),
              LabelText(
                text: '${deadline.day}/${deadline.month}/${deadline.year}',
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '115'.tr),
              Flexible(
                child: TextButton(
                  onPressed: onPressed,
                  child: Text(
                    publishedBy,
                    style: TextStyle(
                      color: Colors.orange.shade800,
                      decoration: TextDecoration.underline,
                      decorationColor: Colors.lightBlue.shade900,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '182'.tr),
              LabelText(
                text:
                    '${publishDate.day}/${publishDate.month}/${publishDate.year}',
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '173'.tr),
              LabelText(
                text: '$minOffer\$-$maxOffer\$',
              ),
            ],
          ),
          Row(
            children: [
              BodyText(text: '174'.tr),
              LabelText(text: '$avgOffer\$'),
            ],
          ),
        ],
      ),
    );
  }
}
