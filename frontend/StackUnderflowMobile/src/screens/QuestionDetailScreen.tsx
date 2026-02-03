import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useAuth } from "../store/AuthContext";
import type { Question, Comment } from "../types";
import { fetchQuestionById, updateQuestion } from "../services/questions";
import { addComment, updateComment, deleteComment } from "../services/comments";
import { formatDateTime } from "../utils/formatDate";
import { QuestionDetailScreenProps } from "../navigation/types";

export function QuestionDetailScreen({ route, navigation }: QuestionDetailScreenProps) {
  const { questionId } = route.params;
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const loadQuestion = async () => {
    try {
      const data = await fetchQuestionById(questionId);
      setQuestion(data);
    } catch (error) {
      console.error("Failed to load question:", error);
      Alert.alert("Error", "Failed to load question");
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [questionId]);

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const comment = await addComment({
        questionId,
        content: newComment,
        userId: user.id,
        username: user.username,
      });
      setQuestion((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...prev.comments, comment],
        };
      });
      setNewComment("");
    } catch (error) {
      Alert.alert("Error", "Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!user || !editingContent.trim()) return;

    try {
      const updatedComment = await updateComment({
        questionId,
        commentId,
        content: editingContent,
        userId: user.id,
      });
      setQuestion((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === commentId ? updatedComment : c
          ),
        };
      });
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      Alert.alert("Error", "Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;

    Alert.alert("Delete Comment", "Are you sure you want to delete this comment?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteComment(questionId, commentId, user.id);
            setQuestion((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                comments: prev.comments.filter((c) => c.id !== commentId),
              };
            });
          } catch (error) {
            Alert.alert("Error", "Failed to delete comment");
          }
        },
      },
    ]);
  };

  const handleStatusChange = async (status: "open" | "answered" | "closed") => {
    if (!user || !question) return;

    try {
      const updated = await updateQuestion({
        id: question.id,
        title: question.title,
        description: question.description,
        status,
        userId: user.id,
      });
      setQuestion(updated);
    } catch (error) {
      Alert.alert("Error", "Failed to update status");
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

  if (!question) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Question not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const canEdit = user?.id === question.userId;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>{question.title}</Text>
            <View
              style={[
                styles.statusBadge,
                question.status === "answered" && styles.statusAnswered,
                question.status === "closed" && styles.statusClosed,
              ]}
            >
              <Text style={styles.statusText}>{question.status}</Text>
            </View>
          </View>

          <Text style={styles.questionDescription}>{question.description}</Text>

          <View style={styles.questionFooter}>
            <Text style={styles.authorText}>Asked by {question.username}</Text>
            <Text style={styles.dateText}>{formatDateTime(question.createdAt)}</Text>
          </View>

          {canEdit && (
            <View style={styles.statusButtons}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  question.status === "open" && styles.statusButtonActive,
                ]}
                onPress={() => handleStatusChange("open")}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    question.status === "open" && styles.statusButtonTextActive,
                  ]}
                >
                  Open
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  question.status === "answered" && styles.statusButtonActive,
                ]}
                onPress={() => handleStatusChange("answered")}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    question.status === "answered" && styles.statusButtonTextActive,
                  ]}
                >
                  Answered
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  question.status === "closed" && styles.statusButtonActive,
                ]}
                onPress={() => handleStatusChange("closed")}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    question.status === "closed" && styles.statusButtonTextActive,
                  ]}
                >
                  Closed
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.commentsTitle}>
          Comments ({question.comments.length})
        </Text>

        {question.comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            {editingCommentId === comment.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editingContent}
                  onChangeText={setEditingContent}
                  multiline
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleUpdateComment(comment.id)}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setEditingCommentId(null);
                      setEditingContent("");
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.commentContent}>{comment.content}</Text>
                <View style={styles.commentFooter}>
                  <Text style={styles.commentAuthor}>
                    {comment.username} • {formatDateTime(comment.createdAt)}
                  </Text>
                  {user?.id === comment.userId && (
                    <View style={styles.commentActions}>
                      <TouchableOpacity
                        onPress={() => {
                          setEditingCommentId(comment.id);
                          setEditingContent(comment.content);
                        }}
                      >
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(comment.id)}
                      >
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        ))}

        <View style={styles.addCommentSection}>
          <Text style={styles.addCommentTitle}>Add a Comment</Text>
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write your comment..."
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#e3f2fd",
  },
  statusAnswered: {
    backgroundColor: "#e8f5e9",
  },
  statusClosed: {
    backgroundColor: "#ffebee",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1976d2",
  },
  questionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  questionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authorText: {
    fontSize: 12,
    color: "#0077cc",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  statusButtons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  statusButtonActive: {
    backgroundColor: "#f48024",
    borderColor: "#f48024",
  },
  statusButtonText: {
    fontSize: 12,
    color: "#666",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  commentCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  commentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentAuthor: {
    fontSize: 12,
    color: "#999",
  },
  commentActions: {
    flexDirection: "row",
    gap: 12,
  },
  editText: {
    color: "#0077cc",
    fontSize: 12,
  },
  deleteText: {
    color: "#d32f2f",
    fontSize: 12,
  },
  editContainer: {
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#4caf50",
    borderRadius: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffebee",
    borderRadius: 4,
  },
  cancelButtonText: {
    color: "#d32f2f",
    fontSize: 14,
  },
  addCommentSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  addCommentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  submitButton: {
    paddingVertical: 12,
    backgroundColor: "#f48024",
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
