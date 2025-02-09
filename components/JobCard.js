
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const STORAGE_KEY = "bookmarkedJobs";

const JobCard = ({ job, refreshBookmarks }) => {
    const navigation = useNavigation();
    
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        checkIfBookmarked();
    }, [bookmarked]);

    const checkIfBookmarked = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
            const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
            setBookmarked(bookmarks.some((item) => item.id === job.id));
        } 
        catch (error) {
            console.error("Failed to load bookmarks", error);
        }
    };

    const toggleBookmark = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
            let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
            if (bookmarked) {              
                bookmarks = bookmarks.filter((item) => item.id !== job.id);            
            } 
            else {
                bookmarks.push(job);
            }
           
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
            setBookmarked(!bookmarked);
            if (refreshBookmarks) {
                refreshBookmarks(); // Reload bookmarks when toggled
            }
            // console.log("the job is bookmarked",bookmarked)
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
                    <Text style={styles.salary}>💰 {job.primary_details?.Salary || "Not specified"}</Text>
                    <Text style={styles.location}>📍 {job.primary_details?.Place || "Not specified"}</Text>
                    <Text style={styles.experience}>🛠️ Experience: {job.primary_details?.Experience || "Not specified"}</Text>
                    <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
                        <MaterialIcons name={bookmarked ? "bookmark" : "bookmark-border"} size={24} color="#007bff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
