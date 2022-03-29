import 'package:flutter/material.dart';

import './constants.dart';

/// Returns the theme data for the dark theme of the application in
/// the current [context].
ThemeData getDarkTheme(BuildContext context) {
  return ThemeData.dark().copyWith(
    primaryColor: cPrimaryColor,
    canvasColor: cDarkBackgroundColor,
    backgroundColor: cDarkBackgroundColor,
    dialogBackgroundColor: cDarkDialogColor,
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: Palette.darkPrimary,
      brightness: Brightness.dark,
      backgroundColor: cDarkBackgroundColor,
      cardColor: cDarkBackgroundColor,
      accentColor: cAccentColor,
    ),
    textTheme: ThemeData.dark().textTheme.copyWith(
          bodyText1: const TextStyle(
            color: cDarkSecondaryContentColor,
            fontSize: 15,
            fontWeight: FontWeight.normal,
          ),
          headline6: const TextStyle(
            color: cDarkContentColor,
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
  );
}

/// Returns the theme data for the light theme of the application in
/// the current [context].
ThemeData getLightTheme(BuildContext ctx) {
  return ThemeData.light().copyWith(
    primaryColor: cPrimaryColor,
    canvasColor: cLightBackgroundColor,
    backgroundColor: cLightBackgroundColor,
    dialogBackgroundColor: cLightDialogColor,
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: Palette.lightPrimary,
      backgroundColor: Colors.grey.withOpacity(0.2),
      cardColor: Colors.white,
      accentColor: cAccentColor,
    ),
    textTheme: ThemeData.light().textTheme.copyWith(
          bodyText1: const TextStyle(
            color: cLightSecondaryContentColor,
            fontSize: 15,
            fontWeight: FontWeight.normal,
          ),
          headline6: const TextStyle(
            color: cLightContentColor,
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
  );
}
