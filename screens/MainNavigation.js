import { ActivityIndicator, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import * as Network from "expo-network";
import { createStackNavigator } from "@react-navigation/stack";
import CodeScreen from "./auth/CodeScreen";
import ControlScreen from "./app/ControlScreen";
import ScreenshotScreen from "./app/Control/screenshot";
import LockScreen from "./app/Control/lock";
import MicrophoneScreen from "./app/Control/mic";
import NLockerScreen from "./app/Control/nl";
import PowerOptionsScreen from "./app/Control/power";
import CameraScreen from "./app/Control/camera";

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={CodeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/*<Stack.Screen name="Register" component={RegisterScreen} />*/}
    </Stack.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Control"
        component={ControlScreen}
        options={{
          title: "Your Control Panel",
        }}
      />
      <Stack.Screen
        name="Screenshot"
        component={ScreenshotScreen}
        options={{
          title: "Take A Screenshot",
        }}
      />
      <Stack.Screen
        name="Lock"
        component={LockScreen}
        options={{
          title: "Lock Your PC",
        }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: "Camera PC",
        }}
      />
      <Stack.Screen
        name="Microphone"
        component={MicrophoneScreen}
        options={{
          title: "Record Audio",
        }}
      />
      <Stack.Screen
        name="NLocker"
        component={NLockerScreen}
        options={{
          title: "Emergency Locker",
        }}
      />

      <Stack.Screen
        name="PowerOptions"
        component={PowerOptionsScreen}
        options={{
          title: "Power Options",
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  useEffect(() => {
    Network.getNetworkStateAsync().then((net) => {
      if (net.isConnected && net.isInternetReachable) {
        // GetUser();
      } else {
        ToastAndroid.showWithGravity(
          "No Internet Connection. ",
          10000,
          ToastAndroid.CENTER
        );
        //    Navigate to no internet page
      }
    });
  }, []);
  // if (loading)
  //     return (
  //         <ActivityIndicator style={{justifyContent: "center", flex: 1}} size="large"/>
  //     );
  // if (auth) {
  //     return <MainStack />;
  // }
  return <MainStack />;
};

export default Navigation;
