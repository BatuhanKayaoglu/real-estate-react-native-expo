    import React, { useContext } from "react";
    import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    } from "react-native";
    import AuthForm from "../components/AuthForm";
    import SpinnerLoader from "../components/Spinner";

    const LoginScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SpinnerLoader
            // visible={state.isLoading}
            textContent={"Giriş yapılıyor..."}
            textStyle={styles.spinnerText}
            overlayColor="rgba(0, 0, 0, 0.7)"
        />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <AuthForm
            headerText="Welcome Back"
            subHeaderText="Please sign in to continue"
            submitButtonText="Sign In"
            onAlternativePress={() => navigation.navigate("Register")}
            alternativeText="Don't have an account? Sign up instead"
            isSignUp={false}
            />
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2B2B2B",
    },
    spinnerText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
    },
    });

    LoginScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
    };

    export default LoginScreen;


