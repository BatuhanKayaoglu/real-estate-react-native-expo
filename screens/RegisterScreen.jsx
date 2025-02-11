import React, { useContext } from 'react';
import { 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import AuthForm from '../components/AuthForm';
import SpinnerLoader from '../components/Spinner';

const RegisterScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <SpinnerLoader
                // visible={state.isLoading}
                textContent={'Kayıt işlemi yapılıyor...'}
                textStyle={styles.spinnerText}
                overlayColor="rgba(0, 0, 0, 0.7)"
            />
                
                <AuthForm 
                    headerText="Hesap aç"
                    subHeaderText="Devam etmek için kayıt olun."
                    submitButtonText="Kayıt Ol"
                    onAlternativePress={() => navigation.navigate('Login')}
                    alternativeText="Zaten bir hesabın var mı? Giriş yap"
                    isSignUp={true}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

RegisterScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default RegisterScreen;