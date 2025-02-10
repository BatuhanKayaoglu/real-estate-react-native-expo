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
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Image, StyleSheet } from "react-native";
import { store } from "../store";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HeaderRight from "../components/HeaderRight";
import DrawerComp from "../components/DrawerComp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// RootStack'i şimdilik kullanmıyoruz çünkü TAB yapısı mevcut ve onun üzerinden ilerleyeceğiz.
function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3988FF" },
        headerTintColor: "#3988FF",
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerComp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Sign In" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}

// Drawer navigator
function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0077CC" },
        headerRight: () => <HeaderRight />,
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 290,
        },
        drawerActiveTintColor: "#0077CC",
        drawerInactiveTintColor: "#B0B3B8",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "sahibinden.com" }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Sign In" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Drawer.Navigator>
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
