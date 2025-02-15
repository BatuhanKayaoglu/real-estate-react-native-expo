import "../gesture-handler";
import * as React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider, useSelector } from "react-redux";
import ProfileScreen from "../screens/ProfileScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { store } from "../store";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DrawerComp from "../components/DrawerComp";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AdvertDetailScreen from "../screens/AdvertDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import FavouriteButton from "../components/FavouriteButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// RootStack'i şimdilik kullanmıyoruz çünkü TAB yapısı mevcut ve onun üzerinden ilerleyeceğiz.
function RootStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3988FF" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      {/* Drawer */}
      <Stack.Screen
        name="Drawer"
        component={DrawerComp}
        options={{ headerShown: false }}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Giriş Yap",
          headerShown: true,
          // navigate to login with headerRight button
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Drawer")}>
              <Ionicons name="home-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Register Screen */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Hesap Aç", headerShown: true }}
      />

      {/* Profile Screen */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil", headerShown: true }}
      />

      {/* Advert Detail Screen */}
      <Stack.Screen
        name="advert-detail"
        component={AdvertDetailScreen}
        options={({ navigation, route }) => ({
          title: "İlan Detayı",
          headerShown: true,
          headerRight: () => {
            const advertId = route.params?.listing?.id;
            return <FavouriteButton advertId={advertId} />;
          },
        })}
      />

      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ title: "Arama", headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NavigationIndependentTree>
    </Provider>
  );
}

const styles = StyleSheet.create({});
