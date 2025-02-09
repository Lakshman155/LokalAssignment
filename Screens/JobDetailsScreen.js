import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const JobDetailsScreen = () => {
    const route = useRoute();
    const { job } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: job.creatives[0]?.file }} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Salary:</Text> 💰 {job.primary_details?.Salary || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Location:</Text> 📍 {job.primary_details?.Place || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Experience:</Text> 🛠️ {job.primary_details?.Experience || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Job Type:</Text> {job.primary_details?.Job_Type || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Qualification:</Text> {job.primary_details?.Qualification || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Shift Timing:</Text> {job.shift_timing || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Category:</Text> {job.job_category || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Openings:</Text> {job.openings_count || "Not specified"}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Description:</Text> {job.other_details || "Not available"}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode:"stretch"
    },
    contentContainer: {
        padding: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    label: {
        fontWeight: "bold",
    },
});

export default JobDetailsScreen;
