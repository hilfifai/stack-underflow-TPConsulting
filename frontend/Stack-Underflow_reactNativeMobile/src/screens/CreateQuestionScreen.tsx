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
  SafeAreaView,
} from "react-native";
import { useAuth } from "../store/AuthContext";
import { createQuestion } from "../services/questions";
import { CreateQuestionScreenProps } from "../navigation/types";

export function CreateQuestionScreen({ navigation }: CreateQuestionScreenProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to create a question");
      return;
    }

    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (title.trim().length < 5) {
      Alert.alert("Error", "Title must be at least 5 characters");
      return;
    }

    if (description.trim().length < 10) {
      Alert.alert("Error", "Description must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await createQuestion({
        title: title.trim(),
        description: description.trim(),
        userId: user.id,
        username: user.username,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create question"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Ask a Question</Text>
          <Text style={styles.subtitle}>
            Be specific and imagine you're asking a question to another person
          </Text>

          <View style={styles.formSection}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.hint}>
              Be specific and imagine you're asking a question to another person
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. How do I center a div in CSS?"
              value={title}
              onChangeText={setTitle}
              maxLength={200}
              editable={!isSubmitting}
            />
            <Text style={styles.charCount}>{title.length}/200</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.hint}>
              Include all the information someone would need to answer your
              question
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Explain your problem in detail..."
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              numberOfLines={6}
              editable={!isSubmitting}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Posting..." : "Post Your Question"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#f48024",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
