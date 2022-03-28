import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:splashscreen/splashscreen.dart';

import 'home_screen.dart';
import 'signup_screen.dart';

class IntroScreen extends StatelessWidget {
  const IntroScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Get the current user, is null if not signed in already
    final User? user = FirebaseAuth.instance.currentUser;

    // If the user signed in, navigate to home, else to sign up screen
    final Widget navigateTo =
        user != null ? HomeScreen(uid: user.uid) : const SignUpScreen();

    return SplashScreen.timer(
      seconds: 2,
      photoSize: 60,
      navigateAfterSeconds: navigateTo,
      image: Image.asset('assets/images/logo.png', fit: BoxFit.scaleDown),
      loaderColor: const Color.fromARGB(255, 158, 209, 243),
    );
  }
}
