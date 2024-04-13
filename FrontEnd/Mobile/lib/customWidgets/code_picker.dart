import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';

class CodePicker extends StatelessWidget {
  final void Function(CountryCode)? onChange;

  const CodePicker({super.key, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return CountryCodePicker(
      showDropDownButton: true,
      dialogTextStyle: Theme.of(context).textTheme.labelLarge,
      searchStyle: Theme.of(context).textTheme.labelLarge,
      dialogSize: const Size(400, 300),
      hideSearch: true,
      textStyle: Theme.of(context).textTheme.labelLarge,
      initialSelection: '+963',
      onChanged: onChange,
    );
  }
}
