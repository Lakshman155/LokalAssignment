import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const STORAGE_KEY = "bookmarkedJobs";

const JobCard = ({ job }) => {
    const navigation = useNavigation();
    console.log(job);
    var salary = "Not specified";
    var place = "Not specified";
    var exp = "Not specified";
    
    if (job.primary_details) {
        salary = job.primary_details.Salary;
        place = job.primary_details.Place;
        exp = job.primary_details.Experience;
    }
    
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        checkIfBookmarked();
    }, []);

    const checkIfBookmarked = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
            const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
            setBookmarked(bookmarks.some((item) => item.id === job.id));
        } catch (error) {
            console.error("Failed to load bookmarks", error);
        }
    };

    const toggleBookmark = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
            let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

            if (bookmarked) {
                bookmarks = bookmarks.filter((item) => item.id !== job.id);
            } else {
                bookmarks.push(job);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
            setBookmarked(!bookmarked);
        } catch (error) {
            console.error("Failed to update bookmarks", error);
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate("JobDetails", { job })}>
            <View style={styles.card}>
                <Image source={{ uri: job.creatives[0]?.file }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.salary}>💰 {salary}</Text>
                    <Text style={styles.location}>📍 {place}</Text>
                    <Text style={styles.experience}>🛠️ Experience: {exp}</Text>
                    <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
                        <MaterialIcons name={bookmarked ? "bookmark" : "bookmark-border"} size={24} color="#007bff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f8f9fa",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
        elevation: 4,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
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
    bookmarkButton: {
        marginTop: 10,
        alignItems: "center",
    },
});

export default JobCard;
