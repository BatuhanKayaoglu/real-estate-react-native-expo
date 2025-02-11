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
            headerText="Giriş yap"
            subHeaderText="Devam etmek için giriş yapın."
            submitButtonText="Giriş yap"
            onAlternativePress={() => navigation.navigate("Register")}
            alternativeText="Henüz hesabın yok mu? Hesap aç"
            isSignUp={false}
            />
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
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


