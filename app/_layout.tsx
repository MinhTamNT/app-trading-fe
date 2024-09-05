import { persistor, store } from "@/Redux/store";
import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export const RootLayout = () => {
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PersistGate>
  </Provider>;
};
