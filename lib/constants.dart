import 'package:flutter/material.dart';

class Palette {
  static const MaterialColor darkPrimary = MaterialColor(
    0xfffe5293,
    <int, Color>{
      50: Color(0xffe54a84), //10%
      100: Color(0xffcb4276), //20%
      200: Color(0xffb23967), //30%
      300: Color(0xff983158), //40%
      400: Color(0xff7f294a), //50%
      500: Color(0xff66213b), //60%
      600: Color(0xff4c192c), //70%
      700: Color(0xff33101d), //80%
      800: Color(0xff19080f), //90%
      900: Color(0xff000000), //100%
    },
  );

  static const MaterialColor lightPrimary = MaterialColor(
    0xfffe5293,
    <int, Color>{
      50: Color(0xfffe639e), //10%
      100: Color(0xfffe75a9), //20%
      200: Color(0xfffe75a9), //30%
      300: Color(0xfffe86b3), //40%
      400: Color(0xffffa9c9), //50%
      500: Color(0xffffbad4), //60%
      600: Color(0xffffcbdf), //70%
      700: Color(0xffffdce9), //80%
      800: Color(0xffffeef4), //90%
      900: Color(0xffffffff), //100%
    },
  );
}

const Color cPrimaryColor = Color.fromRGBO(254, 82, 147, 1);
const Color cAccentColor = Color.fromRGBO(255, 169, 146, 1);

const Color cDarkBackgroundColor = Color.fromRGBO(55, 56, 86, 1);
const Color cLightBackgroundColor = Color.fromRGBO(255, 255, 255, 1);

const Color cDarkDialogColor = Color.fromARGB(255, 43, 43, 66);
const Color cLightDialogColor = Color.fromARGB(255, 231, 227, 227);

const Color cDarkContentColor = Colors.white;
const Color cLightContentColor = Color.fromRGBO(55, 56, 86, 1);

const Color cDarkSecondaryContentColor = Color.fromRGBO(235, 235, 245, 0.6);
const Color cLightSecondaryContentColor = Color(0xFF2A0D2E);

const List<Color> cDarkBackgroundGradient = <Color>[
  Color.fromRGBO(46, 47, 85, 1),
  Color.fromRGBO(35, 37, 60, 1)
];

const List<Color> cLightBackgroundGradient = <Color>[
  Color.fromRGBO(255, 255, 255, 1),
  Color.fromRGBO(255, 255, 255, 1)
];
