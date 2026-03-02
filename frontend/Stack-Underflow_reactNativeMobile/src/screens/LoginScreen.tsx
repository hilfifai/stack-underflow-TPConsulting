import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../store/AuthContext";
import { LoginScreenProps } from "../navigation/types";

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { login, isLoading, error, clearError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    clearError();
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      await login(username, password);
    } catch {
      // Error is handled by context
    }
  };

  const navigateToSignup = () => {
    clearError();
    navigation.replace("Signup");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>StackUnderflow</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={navigateToSignup}>
          <Text style={styles.linkText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#f48024",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
  },
  error: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#f48024",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
  },
  linkText: {
    color: "#0077cc",
    fontSize: 16,
  },
});
