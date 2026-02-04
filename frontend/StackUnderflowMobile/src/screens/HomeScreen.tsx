import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useAuth } from "../store/AuthContext";
import type { Question } from "../types";
import { fetchQuestions } from "../services/questions";
import { formatDate } from "../utils/formatDate";
import { HomeScreenProps } from "../navigation/types";

const PAGE_SIZE = 10;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, logout } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadQuestions = useCallback(
    async (resetPage = false, search = "") => {
      const currentPage = resetPage ? 0 : page;
      const offset = currentPage * PAGE_SIZE;

      try {
        if (resetPage) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const data = await fetchQuestions({
          search: search || searchQuery,
          limit: PAGE_SIZE,
          offset: resetPage ? 0 : offset,
        });

        if (resetPage) {
          setQuestions(data);
        } else {
          setQuestions((prev) => {
            const existingIds = new Set(prev.map((q) => q.id));
            const newData = data.filter((q) => !existingIds.has(q.id));
            return [...prev, ...newData];
          });
        }

        setHasMore(data.length === PAGE_SIZE);
        setPage(currentPage + 1);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [page, searchQuery]
  );

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      loadQuestions(true, "");
    }
  }, [isInitialized, loadQuestions]);

  const handleRefresh = () => {
    setSearchQuery("");
    setIsRefreshing(true);
    loadQuestions(true, "").finally(() => {
      setIsRefreshing(false);
    });
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore && !searchQuery) {
      loadQuestions(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(0);
    setHasMore(true);
    if (query.trim() === "") {
      loadQuestions(true, "");
    }
  };

  useEffect(() => {
    if (searchQuery !== undefined) {
      const timeoutId = setTimeout(() => {
        loadQuestions(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, loadQuestions]);

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

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.loadMoreContainer}>
          <Text style={styles.loadMoreText}>Loading more...</Text>
        </View>
      );
    }
    if (!hasMore && questions.length > 0) {
      return (
        <View style={styles.loadMoreContainer}>
          <Text style={styles.loadMoreText}>No more questions</Text>
        </View>
      );
    }
    return null;
  };

  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery ? "No questions found" : "No questions yet"}
        </Text>
        <Text style={styles.emptySubtext}>
          {searchQuery
            ? "Try a different search term"
            : "Be the first to ask a question!"}
        </Text>
      </View>
    );
  };

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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToCreateQuestion}
      >
        <Text style={styles.createButtonText}>Ask Question</Text>
      </TouchableOpacity>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={renderQuestionItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList()}
      />
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  createButton: {
    marginHorizontal: 16,
    marginVertical: 8,
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
    marginTop: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loadMoreContainer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  loadMoreText: {
    fontSize: 14,
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
