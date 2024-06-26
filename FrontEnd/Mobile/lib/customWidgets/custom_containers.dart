import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jobera/classes/texts.dart';

class DateContainer extends StatelessWidget {
  final Widget widget;

  const DateContainer({super.key, required this.widget});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: 170,
      height: 40,
      padding: const EdgeInsets.all(5),
      margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
      decoration: ShapeDecoration(
        shape: StadiumBorder(
          side: BorderSide(
            color: Colors.orange.shade800,
          ),
        ),
      ),
      child: widget,
    );
  }
}

class LogoContainer extends StatelessWidget {
  final String imagePath;

  const LogoContainer({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,
      decoration: ShapeDecoration(
          shape: const StadiumBorder(),
          gradient: LinearGradient(
            colors: [
              Colors.lightBlue.shade900,
              Colors.orange.shade800,
              Colors.cyan,
            ],
          ),
          shadows: const [
            BoxShadow(
              color: Colors.cyan,
              blurRadius: 20,
              blurStyle: BlurStyle.outer,
            )
          ]),
      child: Image.asset(imagePath),
    );
  }
}

class ProfilePhotoContainer extends StatelessWidget {
  final void Function()? onTap;
  final Widget? child;
  final double? height;
  final double? width;

  const ProfilePhotoContainer({
    super.key,
    this.onTap,
    this.child,
    this.height,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(10),
        height: height,
        width: width,
        decoration: ShapeDecoration(
          shape: BeveledRectangleBorder(
            borderRadius: const BorderRadius.all(
              Radius.circular(10),
            ),
            side: BorderSide(color: Colors.orange.shade800),
          ),
        ),
        child: child,
      ),
    );
  }
}

class ProfileBackgroundContainer extends StatelessWidget {
  final Widget child;
  final void Function()? onPressed;

  const ProfileBackgroundContainer(
      {super.key, required this.child, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
            height: 200,
            decoration: ShapeDecoration(
              shape: const BeveledRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(20),
                ),
              ),
              gradient: LinearGradient(
                colors: [
                  Colors.orange.shade800,
                  Colors.lightBlue.shade900,
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: IconButton(
              onPressed: onPressed,
              icon: const Icon(
                Icons.add_a_photo,
                color: Colors.cyan,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(6),
            decoration: const ShapeDecoration(
              shape: BeveledRectangleBorder(
                side: BorderSide(color: Colors.cyan),
                borderRadius: BorderRadius.all(
                  Radius.circular(10),
                ),
              ),
            ),
            child: SizedBox(
              height: 150,
              width: 150,
              child: child,
            ),
          ),
        ],
      ),
    );
  }
}

class InfoWithEditContainer extends StatelessWidget {
  final String name;
  final String buttonText;
  final IconData? icon;
  final Widget widget;
  final void Function()? onPressed;
  final double? width;
  final double? height;

  const InfoWithEditContainer({
    super.key,
    required this.name,
    required this.buttonText,
    required this.widget,
    required this.onPressed,
    this.icon,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      decoration: ShapeDecoration(
        shape: BeveledRectangleBorder(
          borderRadius: const BorderRadius.all(Radius.circular(10)),
          side: BorderSide(color: Colors.orange.shade800),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                BodyText(text: '$name:'),
                TextButton(
                  onPressed: onPressed,
                  child: Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(5),
                        child: Icon(
                          icon,
                          color: Colors.orange.shade800,
                        ),
                      ),
                      LabelText(text: buttonText),
                    ],
                  ),
                ),
              ],
            ),
            widget
          ],
        ),
      ),
    );
  }
}

class SkillsContainer extends StatelessWidget {
  final String? name;
  final Widget widget;

  const SkillsContainer({
    super.key,
    this.name,
    required this.widget,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: ShapeDecoration(
        shape: BeveledRectangleBorder(
          borderRadius: const BorderRadius.all(Radius.circular(10)),
          side: BorderSide(color: Colors.orange.shade800),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  BodyText(text: name.toString()),
                ],
              ),
            ),
            widget
          ],
        ),
      ),
    );
  }
}

class ListContainer extends StatelessWidget {
  final Widget? child;
  final void Function()? onTap;
  final double? width;
  final double? height;

  const ListContainer({
    super.key,
    required this.child,
    this.onTap,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Container(
          width: width,
          height: height,
          decoration: ShapeDecoration(
            shape: BeveledRectangleBorder(
              side: BorderSide(color: Colors.orange.shade800),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Center(
              child: child,
            ),
          ),
        ),
      ),
    );
  }
}

class SendMessageContainer extends StatelessWidget {
  final Widget? child;

  const SendMessageContainer({
    super.key,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: Get.width,
      padding: const EdgeInsets.all(10),
      color: Colors.grey[200],
      child: child,
    );
  }
}

class MessageContainer extends StatelessWidget {
  final Widget? child;
  final Color color;

  const MessageContainer({
    super.key,
    this.child,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      padding: const EdgeInsets.all(5),
      decoration: ShapeDecoration(
        shape: RoundedRectangleBorder(
          side: BorderSide(color: color),
          borderRadius: BorderRadius.circular(15),
        ),
      ),
      child: child,
    );
  }
}
