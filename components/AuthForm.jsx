import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { useSignInMutation, useSignUpMutation } from "../store/apis/authApi";
import { setToken, setUser } from "../store/slicers/authSlice";

const AuthForm = ({
  headerText,
  subHeaderText,
  submitButtonText,
  onAlternativePress,
  alternativeText,
  isSignUp = false,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading: signInLoading, error: signInError }] = useSignInMutation();
  const [signUp, { isLoading: signUpLoading, error: signUpError }] = useSignUpMutation();

  const errorMessage = isSignUp ? signUpError?.data : signInError?.data?.error;

  const handleSubmit = async () => {
    const userData = { email, password };
    try {
      const response = isSignUp ? await signUp(userData).unwrap() : await signIn(userData).unwrap();
      dispatch(setToken(response.token));
      dispatch(setUser({ username: email, password: password }));
      navigation.navigate("MainTabs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.subHeaderText}>{subHeaderText}</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={signInLoading || signUpLoading}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <TouchableOpacity onPress={onAlternativePress}>
        <Text style={styles.linkText}>{alternativeText}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#B0B0B0",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FE2266",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  linkText: {
    color: "#FE2266",
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default AuthForm;
