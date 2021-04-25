import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InfoScreen from './navigation/info.screen';
import HomeScreen from './navigation/home.screen';

import {StatusBar} from 'react-native';
import SettingScreen from './navigation/settings.screen';
import ControlScreen from './navigation/control.screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Colors} from 'react-native-ui-lib';
import {useState} from 'react';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      {/* // UnAuthed Stack */}
      {/* <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}

      <Tab.Navigator
        barStyle={{
          backgroundColor: Colors.grey10,
          borderTopWidth: 0,
        }}
        initialRouteName="Info"
        activeColor={Colors.grey40}
        inactiveColor={Colors.grey70}
        labeled={false}
        shifting={true}
        sceneAnimationEnabled={true}
        headerMode="none">
        <Tab.Screen
          name="Info"
          component={InfoScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="infocirlceo" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Control"
          component={ControlScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="notification" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="md-settings-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
