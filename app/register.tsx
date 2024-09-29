import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Select from "@/components/Modal/SelectModal";
import { registerUser } from "@/Redux/request";

const RegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const needs = [
    { label: "Need", value: "1" },
    { label: "Auto Trade", value: "2" },
  ];

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    need: Yup.string().required("Need is required"),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ea" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.title}>Create Your Account</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#6200ea" />
            ) : (
              <Formik
                initialValues={{
                  username: "",
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone: "",
                  password: "",
                  need: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    await registerUser(values, dispatch, navigation.navigate);
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {/* Username Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}

                    {/* First Name Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("first_name")}
                      onBlur={handleBlur("first_name")}
                      value={values.first_name}
                    />
                    {touched.first_name && errors.first_name && (
                      <Text style={styles.errorText}>{errors.first_name}</Text>
                    )}

                    {/* Last Name Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("last_name")}
                      onBlur={handleBlur("last_name")}
                      value={values.last_name}
                    />
                    {touched.last_name && errors.last_name && (
                      <Text style={styles.errorText}>{errors.last_name}</Text>
                    )}

                    {/* Email Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    {/* Phone Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      keyboardType="phone-pad"
                    />
                    {touched.phone && errors.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}

                    {/* Password Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#888"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    {/* Select Need */}
                    <Select
                      options={needs}
                      value={values.need}
                      onChange={(value: string) => handleChange("need")(value)}
                      placeholder="Select Your Need"
                    />
                    {touched.need && errors.need && (
                      <Text style={styles.errorText}>{errors.need}</Text>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#001244",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    borderRadius: 15,
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  formContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#6200ea",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginBottom: 12,
  },
});

export default RegisterScreen;
