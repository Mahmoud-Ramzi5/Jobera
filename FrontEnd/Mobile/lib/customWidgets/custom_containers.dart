import 'package:flutter/material.dart';
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
  const ProfilePhotoContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 150,
      height: 150,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Container(
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.add_a_photo,
              color: Colors.lightBlue.shade900,
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileBackgroundContainer extends StatelessWidget {
  const ProfileBackgroundContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Container(
        height: 200,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.orange.shade800,
              Colors.lightBlue.shade900,
            ],
          ),
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(50),
            topRight: Radius.circular(50),
            bottomLeft: Radius.circular(50),
            bottomRight: Radius.circular(50),
          ),
        ),
      ),
    );
  }
}

class InfoWithEditContainer extends StatelessWidget {
  final String name;
  final String buttonText;
  final IconData? icon;
  final double? height;
  final Widget widget;
  final void Function()? onPressed;

  const InfoWithEditContainer({
    super.key,
    required this.name,
    required this.buttonText,
    required this.height,
    required this.widget,
    required this.onPressed,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
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
  final String name;
  final Widget widget;

  const SkillsContainer({
    super.key,
    required this.name,
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
                  BodyText(text: '$name:'),
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

class TypesContainer extends StatelessWidget {
  final String text;
  final void Function()? onTap;

  const TypesContainer({
    super.key,
    required this.text,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Container(
          decoration: ShapeDecoration(
            shape: BeveledRectangleBorder(
              side: BorderSide(color: Colors.lightBlue.shade900),
            ),
          ),
          child: Center(
            child: BodyText(
              text: text,
            ),
          ),
        ),
      ),
    );
  }
}
