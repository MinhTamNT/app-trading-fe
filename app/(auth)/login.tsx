import { loginUser } from "@/Redux/request";
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

WebBrowser.maybeCompleteAuthSession();

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authInProgress, setAuthInProgress] = useState(false);

  // Setup AuthSession
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "396380590167-2c2lleliaj015es73lvv2hfo10ieq9cv.apps.googleusercontent.com",
    webClientId:
      "396380590167-vduhqqnrt2vh31ceh3ci4a351dkifh5r.apps.googleusercontent.com",
    scopes: ["email", "profile"],
    redirectUri: AuthSession.makeRedirectUri(),
    responseType: "code",
  });

  // useEffect(() => {
  //   const handleSignInGoogle = async () => {
  //     const storedUser = await AsyncStorage.getItem("@user");
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     } else if (response?.type === "success") {
  //       const { code } = response.params; // Extract code from response
  //       const tokenData = await getUserInfo(code); // Pass the code to getUserInfo
  //       if (tokenData) {
  //         // Use the tokenData to do something, e.g., store it
  //         navigation.navigate("index");
  //       }
  //     }
  //   };

  //   handleSignInGoogle().catch(console.error);
  // }, [response]);

  // const getUserInfo = async (code: string) => {
  //   if (!code) return null;
  //   try {
  //     const response = await fetch("https://oauth2.googleapis.com/token", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: new URLSearchParams({
  //         code: code,
  //         client_id: "396380590167-vduhqqnrt2vh31ceh3ci4a351dkifh5r.apps.googleusercontent.com",
  //         client_secret: "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",
  //         redirect_uri: AuthSession.makeRedirectUri(), // Ensure redirect_uri matches
  //         grant_type: "authorization_code", // Specify the grant type
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Token response:", data);
  //     if (response.ok) {
  //       // Handle successful token response
  //       return data; // return token data for further use
  //     } else {
  //       // Handle errors
  //       console.error("Error fetching token:", data);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching token:", error);
  //   }
  // };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await loginUser(values, dispatch, navigation.navigate);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (event: GestureResponderEvent) => {
    navigation.navigate("register", { screen: "register" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.username && errors.username
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Username"
                  placeholderTextColor="#ccc"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && errors.username ? (
                  <Text style={styles.errorText}>{errors.username}</Text>
                ) : null}
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>
                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={() => promptAsync()} // Directly call promptAsync for Google sign-in
                >
                  <Image
                    source={require("../../assets/images/search.png")}
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleButtonText}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={handleSignUp}
                >
                  <Text style={styles.signUpText}>Create an Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001244",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "#d9534f",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#6a11cb",
    fontSize: 16,
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#666",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 20,
    borderColor: "#cccc",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    color: "#6a11cb",
    fontSize: 16,
  },
  errorText: {
    color: "#d9534f",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;
