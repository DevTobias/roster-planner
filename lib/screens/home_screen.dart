import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

import '../components/layouts/default_layout.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  @override
  void initState() {
    super.initState();

    // Get the token and save it to firebase, if it exists (ios needs verification).
    _messaging.getToken().then((String? token) {
      if (token != null) {
        _saveDeviceToken(token);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      extendBody: true,
      body: DefaultLayout(
        child: Text('Test'),
      ),
    );
  }

  /// Safe an device [token] from firebase messing
  Future<void> _saveDeviceToken(String token) async {
    const String uid = 'firebase42';

    // Create a unique token document for the authenticated user
    final DocumentReference<Map<String, dynamic>> tokens =
        _db.collection('users').doc(uid).collection('tokens').doc(token);

    // Safe the token with some corresponding meta data
    final Map<String, Object> tokenData = <String, Object>{
      'token': token,
      'createdAt': FieldValue.serverTimestamp(),
      'platform': Platform.operatingSystem
    };

    await tokens.set(tokenData);
  }
}
