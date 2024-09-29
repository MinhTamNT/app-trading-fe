import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Update this import
import { RootStackParamList } from "./_layout";

// Sample user data
const user = {
  name: "NGO TRINH MINH TAM",
  phoneNumber: "+84 123 456 789",
  profileImage: "https://example.com/user-profile.jpg", // Placeholder image URL
};

// Create a type for the navigation prop
type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const handleLogout = () => {
    console.log("User logged out");

    navigation.navigate("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section with user's profile image, name, and phone number */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPhone}>{user.phoneNumber}</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.profileText}>Welcome to your profile page!</Text>
        <Text style={styles.profileSubText}>
          Manage your account information here.
        </Text>
      </View>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#2B3A5D",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B3A5D",
  },
  userPhone: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  content: {
    alignItems: "center",
    paddingVertical: 40,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B3A5D",
    textAlign: "center",
  },
  profileSubText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
