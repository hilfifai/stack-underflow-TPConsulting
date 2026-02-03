import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../store/AuthContext";
import type { Question } from "../types";
import { fetchQuestions } from "../services/questions";
import { formatDate } from "../utils/formatDate";
import { HomeScreenProps } from "../navigation/types";

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, logout } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadQuestions();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const navigateToQuestionDetail = (questionId: string) => {
    navigation.navigate("QuestionDetail", { questionId });
  };

  const navigateToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const handleLogout = async () => {
    await logout();
  };

  const renderQuestionItem = ({ item }: { item: Question }) => (
    <TouchableOpacity
      style={styles.questionCard}
      onPress={() => navigateToQuestionDetail(item.id)}
    >
      <View style={styles.questionHeader}>
        <Text style={styles.questionTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "answered" && styles.statusAnswered,
            item.status === "closed" && styles.statusClosed,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.questionDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.questionFooter}>
        <Text style={styles.authorText}>by {item.username}</Text>
        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.commentCount}>
          {item.comments.length} comments
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StackUnderflow</Text>
        <View style={styles.headerRight}>
          <Text style={styles.userName}>{user?.username}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToCreateQuestion}
      >
        <Text style={styles.createButtonText}>Ask Question</Text>
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      ) : (
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={renderQuestionItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f48024",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffebee",
    borderRadius: 6,
  },
  logoutText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "600",
  },
  createButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    backgroundColor: "#f48024",
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 16,
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
  },
  questionFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorText: {
    fontSize: 12,
    color: "#0077cc",
    marginRight: 12,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
    marginRight: 12,
  },
  commentCount: {
    fontSize: 12,
    color: "#666",
  },
});
