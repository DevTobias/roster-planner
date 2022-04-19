import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../components/layouts/default_layout.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key, required String uid})
      : _uid = uid,
        super(key: key);

  // The uid of the user
  final String _uid;

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

    // Enable virtual display.
    if (Platform.isAndroid) {
      WebView.platform = SurfaceAndroidWebView();
    }
  }

  /*DefaultLayout(
        child: Column(
          children: <Widget>[
            const SizedBox(height: 20),
            CalendarTimeline(
              initialDate: DateTime.now(),
              firstDate: DateTime.now().subtract(const Duration(days: 14)),
              lastDate: DateTime.now().add(const Duration(days: 365)),
              onDateSelected: (DateTime? date) => _handleDateSelect(date!),
              leftMargin: 20,
              activeDayColor: Colors.white,
              monthColor: Theme.of(context).textTheme.headline6!.color,
              locale: 'de',
            ),
          ],
        ),
      ),*/

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      extendBody: true,
      body: DefaultLayout(
        child: WebView(
          initialUrl: 'http://192.168.178.25:3000/rosters',
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    );
  }

  //void _handleDateSelect(DateTime date) {}

  /// Safe an device [token] from firebase messing
  Future<void> _saveDeviceToken(String token) async {
    // Create a unique token document for the authenticated user
    final DocumentReference<Map<String, dynamic>> tokens =
        _db.collection('user').doc(widget._uid).collection('tokens').doc(token);

    // Safe the token with some corresponding meta data
    final Map<String, Object> tokenData = <String, Object>{
      'token': token,
      'createdAt': FieldValue.serverTimestamp(),
      'platform': Platform.operatingSystem
    };

    await tokens.set(tokenData);
  }
}
