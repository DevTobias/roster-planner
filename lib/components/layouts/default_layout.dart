import 'package:flutter/material.dart';

import '../../constants.dart';

class DefaultLayout extends StatelessWidget {
  /// Safe area Layout with optional body [padding].
  const DefaultLayout({
    Key? key,
    required Widget child,
    double padding = 0,
  })  : _child = child,
        _padding = padding,
        super(key: key);

  // The child to render in the layout.
  final Widget _child;

  // The padding value around the child.
  final double _padding;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        width: double.infinity,
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: Theme.of(context).brightness == Brightness.dark
                ? cDarkBackgroundGradient
                : cLightBackgroundGradient,
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(_padding),
          child: _child,
        ),
      ),
    );
  }
}
