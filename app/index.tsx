import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View>
      <Text>Welcome</Text>
      <Link href={"/(auth)/login"}>Go to Login</Link>
    </View>
  );
}
