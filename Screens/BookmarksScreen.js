import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import JobCard from "@/components/JobCard";

const STORAGE_KEY = "bookmarkedJobs";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  // Reload bookmarks whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarkedJobs(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("Failed to load bookmarks", error);
    }
  };

  return (
    <View style={styles.container}>
      {bookmarkedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks yet! ⭐</Text>
          <Text style={styles.subText}>Save jobs to find them later.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => <JobCard job={item} refreshBookmarks={loadBookmarks} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

