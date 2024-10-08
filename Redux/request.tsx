import { API, endPoints } from "@/config/appConfig";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "./authSlice";

export const registerUser = async (
  newUser: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    need: string;
    password: string;
    username: string;
  },
  dispatch: any,
  navigate: any
) => {
  dispatch(registerRequest());
  try {
    const res = await API().post(endPoints["register"], newUser);
    const user = res.data;
    dispatch(registerSuccess(user));
    navigate("login");
  } catch (error: any) {
    dispatch(registerFailure(error.message || "Registration failed"));
    console.error(error);
  }
};

export const loginUser = async (
  credentials: { username: string; password: string },
  dispatch: any,
  navigate: any
) => {
  dispatch(loginRequest());
  try {
    const res = await API().post(endPoints["login"], credentials);
    const user = res.data;
    console.log(user);
    dispatch(loginSuccess(user));
    navigate("tabs");
  } catch (error: any) {
    dispatch(loginFailure(error.message || "Login failed"));
    console.error(error);
  }
};
