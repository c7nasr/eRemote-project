import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InfoScreen from './navigation/info.screen';
import HomeScreen from './navigation/home.screen';
import {StatusBar} from 'react-native';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} translucent backgroundColor="transparent" />
      {/* // UnAuthed Stack */}
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
