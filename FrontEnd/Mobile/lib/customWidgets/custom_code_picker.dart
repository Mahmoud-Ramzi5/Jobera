import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';

class CustomCodePicker extends StatelessWidget {
  final void Function(CountryCode)? onChange;

  const CustomCodePicker({super.key, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return CountryCodePicker(
      showDropDownButton: true,
      dialogBackgroundColor: Colors.orange.shade100,
      dialogTextStyle: Theme.of(context).textTheme.bodyLarge,
      initialSelection: '+963',
      onChanged: onChange,
    );
  }
}
