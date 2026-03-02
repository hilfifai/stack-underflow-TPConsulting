import 'package:go_router/go_router.dart';
import 'package:stackunderflow/screens/create_question_screen.dart';
import 'package:stackunderflow/screens/edit_question_screen.dart';
import 'package:stackunderflow/screens/home_screen.dart';
import 'package:stackunderflow/screens/login_screen.dart';
import 'package:stackunderflow/screens/question_detail_screen.dart';
import 'package:stackunderflow/screens/signup_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/question/:id',
        builder: (context, state) => QuestionDetailScreen(
          questionId: state.pathParameters['id']!,
        ),
      ),
      GoRoute(
        path: '/create-question',
        builder: (context, state) => const CreateQuestionScreen(),
      ),
      GoRoute(
        path: '/edit-question/:id',
        builder: (context, state) => EditQuestionScreen(
          questionId: state.pathParameters['id']!,
        ),
      ),
    ],
  );
}
