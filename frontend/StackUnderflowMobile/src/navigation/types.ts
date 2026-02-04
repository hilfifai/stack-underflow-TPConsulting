import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  QuestionDetail: { questionId: string };
  CreateQuestion: undefined;
  EditQuestion: { questionId: string };
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type QuestionDetailScreenProps = NativeStackScreenProps<RootStackParamList, "QuestionDetail">;
export type CreateQuestionScreenProps = NativeStackScreenProps<RootStackParamList, "CreateQuestion">;
export type EditQuestionScreenProps = NativeStackScreenProps<RootStackParamList, "EditQuestion">;
