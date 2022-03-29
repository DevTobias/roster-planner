import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../components/layouts/default_layout.dart';
import 'home_screen.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({Key? key}) : super(key: key);

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      body: DefaultLayout(
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: SizedBox(
              height: MediaQuery.of(context).size.height - 40 - kToolbarHeight,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Image.asset(
                    'assets/images/logo.png',
                    fit: BoxFit.scaleDown,
                    height: 100,
                  ),
                  const SizedBox(height: 30),
                  Text('Bei Ihrem Konto anmelden',
                      style: Theme.of(context).textTheme.headline6),
                  const SizedBox(height: 30),
                  TextFormField(
                    controller: _emailController,
                    decoration: const InputDecoration(
                      labelText: 'Email Address',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(5)),
                      ),
                      prefixIcon: Icon(Icons.email),
                    ),
                    validator: _validateEmail,
                  ),
                  const SizedBox(height: 20),
                  TextFormField(
                    obscureText: true,
                    controller: _passwordController,
                    decoration: const InputDecoration(
                      labelText: 'Password',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(5)),
                      ),
                      prefixIcon: Icon(Icons.key),
                    ),
                    validator: _validatePassword,
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          logIn();
                        }
                      },
                      child: const Text('Einloggen'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  /// Uses the values of the input fields to login in with email password provider
  /// from firebase.
  Future<void> logIn() async {
    try {
      final UserCredential result =
          await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );

      if (!mounted) {
        return;
      }

      Navigator.pushReplacement(
        context,
        MaterialPageRoute<Widget>(
          builder: (BuildContext context) => HomeScreen(uid: result.user!.uid),
        ),
      );
    } on FirebaseAuthException {
      final SnackBar snackBar = SnackBar(
        content: Text('Kein Benutzer mit diesen Daten gefunden.',
            style: Theme.of(context).textTheme.bodyText1),
        backgroundColor: Theme.of(context).bottomAppBarColor,
        behavior: SnackBarBehavior.floating,
      );

      ScaffoldMessenger.of(context).showSnackBar(snackBar);
    }
  }

  /// Validate if the [value] is a valid email or not. If an error occurred,
  /// a error message as string is returned, null instead.
  String? _validateEmail(String? value) {
    if (value!.isEmpty) {
      return 'Bitte eine Email eingeben!';
    }

    if (!RegExp(
            r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$")
        .hasMatch(value)) {
      return 'Bitte eine gültige Email eingeben!';
    }

    return null;
  }

  /// Validate if the [value] is a valid password or not. If an error occurred,
  /// a error message as string is returned, null instead.
  String? _validatePassword(String? value) {
    if (value!.isEmpty) {
      return 'Bitte ein Passwort eingeben!';
    }

    if (value.length < 6) {
      return 'Das Password muss mindestens 6 Zeichen lang sein!';
    }

    return null;
  }
}
