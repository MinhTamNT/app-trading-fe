import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "@/Redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/_layout";
import { AUTHAPI, endPoints } from "@/config/appConfig";
import { AxiosInstance } from "axios";
import { fetchUserRequest, fetchUserSuccess } from "@/Redux/userSlice";

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
  }, [currentUser, navigation]);

  return (
    <View style={{ flex: 1 }}>
      {currentUser ? children : <Text>Loading...</Text>}
    </View>
  );
};

export default AuthGuard;
