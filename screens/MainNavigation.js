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
import PastRequests from "./app/past/PastRequests";

import { connect } from "react-redux";

import { Check_Key_From_Storage } from "../redux/actions/auth";
import ransom_unlock_tries from "./app/Control/ransom_unlock_tries";
import unlock_ransom from "./app/Control/unlock_ransom";
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
      <Stack.Screen
        name="PastRequests"
        component={PastRequests}
        options={{
          title: "Past Requests",
        }}
      />
      <Stack.Screen
        name="InvalidUnlock"
        component={ransom_unlock_tries}
        options={{
          title: "Invalid Unlock Tries",
        }}
      />
         <Stack.Screen
        name="UNLOCK_RANSOM"
        component={unlock_ransom}
        options={{
          title: "Unlock Your PC",
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = ({ Check_Key_From_Storage, auth }) => {
  useEffect(() => {
    Network.getNetworkStateAsync().then((net) => {
      if (net.isConnected && net.isInternetReachable) {
        Check_Key_From_Storage();
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
  if (auth.loading)
    return (
      <ActivityIndicator
        style={{ justifyContent: "center", flex: 1 }}
        size="large"
      />
    );
  if (auth.matched) {
    return <MainStack />;
  }
  return <AuthStack />;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { Check_Key_From_Storage })(Navigation);
