import React, { useState, useEffect } from "react";
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
import { fetchQuestionById, updateQuestion } from "../services/questions";
import { EditQuestionScreenProps } from "../navigation/types";

export function EditQuestionScreen({ route, navigation }: EditQuestionScreenProps) {
  const { questionId } = route.params;
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const question = await fetchQuestionById(questionId);
        setTitle(question.title);
        setDescription(question.description);
      } catch (error) {
        Alert.alert("Error", "Failed to load question");
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestion();
  }, [questionId]);

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to edit a question");
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
      // Get current question to preserve status
      const currentQuestion = await fetchQuestionById(questionId);
      
      await updateQuestion({
        id: questionId,
        title: title.trim(),
        description: description.trim(),
        status: currentQuestion.status,
        userId: user.id,
      });
      
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update question"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Edit Question</Text>

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
              {isSubmitting ? "Saving..." : "Save Changes"}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
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
