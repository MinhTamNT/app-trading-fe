import { RootStackParamList } from "@/app/_layout";
import { AUTHAPI, endPoints } from "@/config/appConfig";
import { RootState } from "@/Redux/store";
import { fetchUserRequest, fetchUserSuccess } from "@/Redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type AuthNavigateProp = NativeStackNavigationProp<RootStackParamList>;

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation<AuthNavigateProp>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      if (!currentUser) {
        navigation.navigate("login");
      } else {
        try {
          await AsyncStorage.setItem("access-token", currentUser.token);
          dispatch(fetchUserRequest());
          const api: any = AUTHAPI(currentUser.token);
          const res = await api.get(endPoints["current-user"]);

          dispatch(fetchUserSuccess(res.data.user));
        } catch (error) {
          console.error(error);

          navigation.navigate("login");
        }
      }
    };

    checkUser();
  }, [currentUser?.token, navigation]);

  return (
    <View style={{ flex: 1 }}>
      {currentUser ? children : <Text>Loading...</Text>}
    </View>
  );
};

export default AuthGuard;
