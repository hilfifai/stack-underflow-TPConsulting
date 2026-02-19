import 'package:stackunderflow/api/validators.dart';
import 'package:stackunderflow/models/user.dart';
import 'package:stackunderflow/store/data_store.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  final DataStore _dataStore = dataStore;

  Future<User> login({
    required String username,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    validateUsername(username);
    validatePassword(password);

    _dataStore.login(username.trim(), password.trim());

    return User(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      username: username.trim(),
    );
  }

  Future<User> signup({
    required String username,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    validateUsername(username);
    validatePassword(password);

    _dataStore.signup(username.trim(), password.trim());

    return User(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      username: username.trim(),
    );
  }

  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 100));
    _dataStore.logout();
  }

  Future<User?> getCurrentUser() async {
    await Future.delayed(const Duration(milliseconds: 100));
    return _dataStore.getCurrentUser();
  }
}

final authService = AuthService();
