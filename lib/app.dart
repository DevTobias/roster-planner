import 'package:flutter/material.dart';

import 'theme.dart';

class App extends StatelessWidget {
  /// Create the application with a specific [title]. It is also needed
  /// to define the [initialWidget], which gets rendered at the start.
  const App({Key? key, required String title, required Widget initialWidget})
      : _title = title,
        _initialWidget = initialWidget,
        super(key: key);

  // The title of the application
  final String _title;

  // The widget which should get rendered initially
  final Widget _initialWidget;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: _title,
      theme: getLightTheme(context),
      darkTheme: getDarkTheme(context),
      home: _initialWidget,
    );
  }
}
