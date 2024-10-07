import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthenticatedTabs } from "./authen";
import Login from "./login";
import Register from "./register"; // Import Register component

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  tabs: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootLayout = () => {
  return (
    <RootStack.Navigator initialRouteName="tabs">
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
