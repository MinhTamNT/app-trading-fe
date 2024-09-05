import { loginUser } from "@/Redux/request";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { auth } from "../../firbaseConfig";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
  
const Login: React.FC = () => {
  const navigation = useNavigation();
  const redirectUri = AuthSession.makeRedirectUri({ isTripleSlashed: true });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Setup AuthSession
  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri: redirectUri,
    androidClientId:
      "652032385062-9ducbn5qeg3r1for50djpni6ht4vpcei.apps.googleusercontent.com",
    iosClientId:
      "652032385062-48ivdtfe9ilskd7s7s1sehq2evc265np.apps.googleusercontent.com",
  });

  console.log("Request:", request);
  console.log("resp", response);
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      handleFirebaseGoogleLogin(id_token);
    }
  }, [response]);

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

  const handleFirebaseGoogleLogin = async (idToken: string) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      console.log("User logged in with Google:", result.user);
      // You can now navigate to another screen or store user info
    } catch (error) {
      console.error("Firebase Google login error:", error);
      Alert.alert("Error", "An error occurred during Google login.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (request) {
        await promptAsync();
      } else {
        Alert.alert("Error", "Authentication request not ready.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigation.navigate("register");
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
                  onPress={handleGoogleLogin} // Use handleGoogleLogin for Google sign-in
                >
                  <Image
                    source={require("../../assets/images/search.png")} // Ensure the path is correct
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
    backgroundColor: "#f7f7f7",
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
    backgroundColor: "#6a11cb",
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
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  signUpButton: {
    marginTop: 10,
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
