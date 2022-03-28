import 'package:flutter/material.dart';

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
    return SizedBox(
      width: double.infinity,
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: _padding,
            vertical: _padding,
          ),
          child: _child,
        ),
      ),
    );
  }
}
