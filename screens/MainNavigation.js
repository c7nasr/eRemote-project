import {ActivityIndicator, ToastAndroid} from "react-native";
import React, { useEffect } from "react";
import * as Network from "expo-network"
import { createStackNavigator } from "@react-navigation/stack";
import CodeScreen from "./auth/CodeScreen";

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
const MainStack = () =>{

}


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
    return <AuthStack/>;
};

export default Navigation