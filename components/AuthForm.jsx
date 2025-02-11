import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "expo-router";
import { supabaseAuth } from "../supabase/supabaseAuth";
import { useState } from "react";

const AuthForm = ({
  headerText,
  subHeaderText,
  submitButtonText,
  onAlternativePress,
  alternativeText,
  isSignUp = false,
}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const errorMessage = isSignUp ? signUpError?.data : signInError?.data?.error;

  const handleSubmit = async () => {
    const userData = { email, password };
    console.log(userData);
    try {
      const response = isSignUp
        ? await supabaseAuth.signUpWithEmail(email, password)
        : await supabaseAuth.signInWithEmail(email, password);
      console.log(response);
      await supabaseAuth.signOut();
      var control = await supabaseAuth.getUser();
      console.log("USERERERR", control);
      // navigation.navigate("MainTabs");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.subHeaderText}>{subHeaderText}</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta adresi"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text
          style={{
            color: "#1a5fa3",
            textAlign: "right",
            fontWeight: "bold",
            marginBottom: 10,
            fontSize: 14,
          }}
        >
          Şifremi Unuttum
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>

      {/* {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>} */}

      <TouchableOpacity onPress={onAlternativePress}>
        <Text style={styles.linkText}>{alternativeText}</Text>
      </TouchableOpacity>

      {/* Çizgi */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={{ color: "#95a198" }}>VEYA</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.googleAppleContainer}>
        <TouchableOpacity style={styles.googleContainer}>
          <Image
            source={require("../assets/images/google-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>
            {isSignUp ? "Google ile kayıt ol" : "Google ile giriş yap"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleContainer}>
          <Image
            source={require("../assets/images/apple-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>
            {isSignUp ? "Apple ile kayıt ol" : "Apple ile giriş yap"}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ marginTop: 10, color: "#95a198" }}>
          Google veya Apple kimliğinizle bir sonraki adıma geçmeniz haline{" "}
          <Text style={{ color: "#438ED8" }}>
            Bireysel Hesap Sözleşmesi ve Ekleri
          </Text>
          'ni kabul etmiş sayılırsınız.
          {"\n"} {"\n"}
          Tarafınızca sağlanmış olan kişisel verileriniz hesap açma esnasında
          kimlik doğrulama tercihinize bağlı olarak Google veya Apple
          vasıtasıyla işlenebilecektir. Kişisel verilerin korunması hakkında
          detaylı bilgiye <Text style={{ color: "#438ED8" }}>buradan</Text>{" "}
          ulaşabilirsiniz.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    color: "black",
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#1a5fa3",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
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
    color: "black",
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    gap: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#95a198",
  },
  googleAppleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },
  googleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
    width: "48%",
    borderWidth: 1,
    borderColor: "#95a198",
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginEnd: 10,
  },
  googleText: {
    color: "#000",
    fontSize: 16,
  },
});

export default AuthForm;
