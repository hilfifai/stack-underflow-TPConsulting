import 'package:flutter/material.dart';

String formatDate(BuildContext context, DateTime date) {
  final now = DateTime.now();
  final diffMs = now.millisecondsSinceEpoch - date.millisecondsSinceEpoch;
  final diffMins = (diffMs / 60000).floor();
  final diffHours = (diffMs / 3600000).floor();
  final diffDays = (diffMs / 86400000).floor();

  final locale = Localizations.localeOf(context).languageCode;

  if (diffMins < 1) {
    return locale == 'id' ? 'Baru saja' : 'Just now';
  }
  if (diffMins < 60) {
    if (locale == 'id') {
      return diffMins == 1
          ? '$diffMins menit yang lalu'
          : '$diffMins menit yang lalu';
    }
    return diffMins == 1
        ? '$diffMins minute ago'
        : '$diffMins minutes ago';
  }
  if (diffHours < 24) {
    if (locale == 'id') {
      return diffHours == 1
          ? '$diffHours jam yang lalu'
          : '$diffHours jam yang lalu';
    }
    return diffHours == 1
        ? '$diffHours hour ago'
        : '$diffHours hours ago';
  }
  if (diffDays < 7) {
    if (locale == 'id') {
      return diffDays == 1
          ? '$diffDays hari yang lalu'
          : '$diffDays hari yang lalu';
    }
    return diffDays == 1
        ? '$diffDays day ago'
        : '$diffDays days ago';
  }

  final format = locale == 'id' ? 'dd MMM yyyy' : 'MMM dd, yyyy';
  return _formatDate(date, format);
}

String _formatDate(DateTime date, String format) {
  final monthsEn = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  final monthsId = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  final months = format.contains('MMM') ? monthsEn : monthsId;
  final month = months[date.month - 1];

  return format.replaceAll('MMM', month).replaceAll('dd', date.day.toString()).replaceAll('yyyy', date.year.toString());
}
