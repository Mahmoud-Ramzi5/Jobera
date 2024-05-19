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
              color: Colors.black,
              shape: BoxShape.circle,
              image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage(
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')),
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
    return Container(
      height: 200,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.lightBlue.shade900,
            Colors.white,
            Colors.orange.shade800,
          ],
        ),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(50),
          bottomRight: Radius.circular(50),
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
                      LabelText(text: buttonText),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Icon(
                          icon,
                          color: Colors.orange.shade800,
                        ),
                      )
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
