import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JobCard from "@/components/JobCard";
const STORAGE_KEY = "bookmarkedJobs";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

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
      
        <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <JobCard job={item} />}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
    width: "100%",
  },
  text: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 4,
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  salary: {
    fontSize: 14,
    color: "#28a745",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 3,
  },
  experience: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 3,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  applyText: {
    color: "white",
    fontWeight: "bold",
  }
});
