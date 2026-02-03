import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "../store/AuthContext";
import { RootStackParamList } from "./types";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { QuestionDetailScreen } from "../screens/QuestionDetailScreen";
import { CreateQuestionScreen } from "../screens/CreateQuestionScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
            <Stack.Screen name="CreateQuestion" component={CreateQuestionScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function AppNavigation() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
