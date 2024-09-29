import { RootState } from "@/Redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootStackParamList } from "./_layout";

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const currentUser = useSelector((state: RootState) => state?.user?.profile);

  const handleLogout = () => {
    console.log("User logged out");
    navigation.navigate("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section with user's profile image, name, and phone number */}
      <View style={styles.header}>
        <Image
          source={{
            uri: currentUser?.avatarUrl
              ? currentUser?.avatarUrl
              : "https://e7.pngegg.com/pngimages/705/224/png-clipart-user-computer-icons-avatar-miscellaneous-heroes.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{currentUser?.first_name}</Text>
        <Text style={styles.userLastName}>{currentUser?.last_name}</Text>
        {/* Last name here */}
        <Text style={styles.userPhone}>{currentUser?.phone_number}</Text>
      </View>

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
  userLastName: {
    // New style for last name
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B3A5D",
    marginTop: 5, // Adds some space between first and last names
  },
  userPhone: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
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
