import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';
import 'screens/intro_screen.dart';

Future<void> main() async {
  await _initializeApp();

  runApp(const App(
    title: 'Kita Dienstpläne',
    initialWidget: IntroScreen(),
  ));
}

Future<void> _initializeApp() async {
  // Enable dithering for images so gradients appear smoother
  Paint.enableDithering = true;

  // Ensure main waits for async calls
  WidgetsFlutterBinding.ensureInitialized();

  // Set the preferred orientations of the application
  final List<DeviceOrientation> orientations = <DeviceOrientation>[
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ];

  await SystemChrome.setPreferredOrientations(orientations);

  // Initializes the firebase app
  await Firebase.initializeApp();
}
