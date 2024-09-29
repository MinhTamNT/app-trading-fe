import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./login";
import Register from "./register"; // Import Register component
import TabNavigationState from "./tabs";
import AuthGuard from "@/components/ProtectRoute/ProtectRoute";
import { AuthenticatedTabs } from "./authen";

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  tabs: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootLayout = () => {
  return (
    <RootStack.Navigator initialRouteName="login">
      <RootStack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="tabs"
        component={AuthenticatedTabs}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
