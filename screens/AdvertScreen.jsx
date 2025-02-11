import { StyleSheet, Text, View, Alert } from "react-native";
import { supabaseAuth } from "../supabase/supabaseAuth"; // Supabase'i doğru şekilde import edin
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native"; // useFocusEffect import
import React, { useCallback } from "react";

export default function AdvertScreen() {
  const navigation = useNavigation();

  const checkUser = async () => {
    const user = await supabaseAuth.getUser(); 
    console.log(user);

    if (!user) {
      Alert.alert("Giriş Yapmanız Gerekiyor", "Lütfen giriş yapınız.", [
        { text: "Tamam", onPress: () => navigation.navigate("Login") },
      ]);
    }
  };

  // Sayfa her odaklandığında (focus) çalışacak
  useFocusEffect(
    useCallback(() => {
      checkUser();
    }, []) // Dependencies array boş bırakılır, çünkü her odaklandığında çalışmasını istiyoruz
  );

  return (
    <View>
      <Text>AdvertScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
