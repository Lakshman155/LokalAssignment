import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import JobsScreen from "../Screens/JobsScreen";
import JobDetailsScreen from "../Screens/JobDetailsScreen";
import BookmarksScreen from "../Screens/BookmarksScreen";
import { Ionicons } from "@expo/vector-icons"; // For icons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for jobs
function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={JobsScreen} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{ title: "Job Details" }}
      />
    </Stack.Navigator>
  );
}

// Main App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Jobs") {
              iconName = "briefcase-outline";
            } else if (route.name === "Bookmarks") {
              iconName = "bookmark-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Jobs"
          component={JobsStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
