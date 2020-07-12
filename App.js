import React from 'react';
import store from "./redux/sotre";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import Navigation from "./screens/MainNavigation";
enableScreens();

export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </Provider>
  );
}

