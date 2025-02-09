// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import JobCard from "@/components/JobCard";

// const STORAGE_KEY = "bookmarkedJobs";
//  function BookmarksScreen() {
//   const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
//   ; // Track changes in bookmarks

//   useEffect(() => {
//     loadBookmarks();
//   }, []); // Reload bookmarks when changed state updates

//   const loadBookmarks = async () => {
//     try {
//       const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
//       if (storedBookmarks) {
//         setBookmarkedJobs(JSON.parse(storedBookmarks));
//       }
//     } catch (error) {
//       console.error("Failed to load bookmarks", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={bookmarkedJobs}
//         keyExtractor={(item, index) =>
//           item.id ? item.id.toString() : index.toString()
//         }
//         renderItem={({ item }) => <JobCard job={item} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f8f9fa",
//   },
// });

// export default BookmarksScreen;





import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
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
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => <JobCard job={item} refreshBookmarks={loadBookmarks} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
});

