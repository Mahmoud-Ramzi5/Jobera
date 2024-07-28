import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
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

class JobDetailsComponent extends StatelessWidget {
  final String? photo;
  final String title;
  final String type;
  final String description;
  final String? country;
  final String? state;
  final DateTime? deadline;
  final double? salary;
  final double? minOffer;
  final double? maxOffer;
  final double? avgOffer;
  final String publishedBy;
  final DateTime publishDate;
  final void Function()? onPressed;
  final bool isFreelancing;

  const JobDetailsComponent({
    super.key,
    this.photo,
    required this.title,
    required this.type,
    required this.description,
    this.country,
    this.state,
    this.deadline,
    this.salary,
    this.minOffer,
    this.maxOffer,
    this.avgOffer,
    required this.publishedBy,
    required this.publishDate,
    this.onPressed,
    required this.isFreelancing,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Center(
          child: ProfilePhotoContainer(
            height: 200,
            width: 200,
            child: photo != null
                ? CustomImage(
                    path: photo!,
                  )
                : Icon(
                    isFreelancing ? Icons.laptop : Icons.work,
                    color: Colors.lightBlue.shade900,
                    size: 100,
                  ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: InfoContainer(
            name: 'Details',
            widget: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Row(
                  children: [
                    const BodyText(text: 'Job Title: '),
                    Flexible(
                      child: LabelText(text: title),
                    ),
                  ],
                ),
                Row(
                  children: [
                    const BodyText(text: 'Job Type: '),
                    LabelText(text: type),
                  ],
                ),
                Row(
                  children: [
                    const BodyText(text: 'Description: '),
                    Flexible(
                      child: LabelText(text: description),
                    ),
                  ],
                ),
                Row(
                  children: [
                    const BodyText(text: 'Location: '),
                    state != null
                        ? LabelText(text: '$country-$state')
                        : const LabelText(text: 'Remotely'),
                  ],
                ),
                if (isFreelancing)
                  Row(
                    children: [
                      const BodyText(text: 'Deadline: '),
                      LabelText(
                        text:
                            '${deadline?.day}/${deadline?.month}/${deadline?.year}',
                      ),
                    ],
                  ),
                Row(
                  children: [
                    const BodyText(text: 'Published by: '),
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
                    const BodyText(text: 'Publish Date: '),
                    LabelText(
                      text:
                          '${publishDate.day}/${publishDate.month}/${publishDate.year}',
                    ),
                  ],
                ),
                Row(
                  children: [
                    BodyText(
                      text: isFreelancing ? 'Offer Range: ' : 'Salary: ',
                    ),
                    LabelText(
                      text: isFreelancing
                          ? '$minOffer-$maxOffer'
                          : salary.toString(),
                    ),
                  ],
                ),
                if (isFreelancing)
                  Row(
                    children: [
                      const BodyText(text: 'Avg offer: '),
                      LabelText(
                        text: avgOffer.toString(),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
