import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import JobCard from '../components/JobCard'

const API_URL = "https://testapi.getlokalapp.com/common/jobs?page=1"; // Replace with actual API endpoint

const JobListScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchJobs = async () => {
    try {
      const response = await fetch(
        API_URL
      );
      const data = await response.json();

      if (data.results) {
        setJobs(data.results);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
        data={jobs}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <JobCard job={item} />}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
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
  },
});

export default JobListScreen;
