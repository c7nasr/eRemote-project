import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InfoScreen from './navigation/info.screen';
import HomeScreen from './navigation/home.screen';

import {ActivityIndicator, StatusBar} from 'react-native';
import SettingScreen from './navigation/settings.screen';
import ControlScreen from './navigation/control.screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Colors} from 'react-native-ui-lib';
import SecurityControl from './navigation/control/security.screen';
import PowerScreen from './navigation/control/power.screen';
import ScreenAndCameraScreen from './navigation/control/screen.screen';
import SecurityLogs from './navigation/control/security.logs.screen';
import {useEffect, useState} from 'react';
import configureStore from './redux/store';

import {authHandler, check_if_key_existed} from './lib/auth.handler';
import {Provider} from 'react-redux';
import {setAuthState} from './redux/actions/Auth.Action';

import ToastMessage from './components/toast';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const store = configureStore();
function Control() {
  return (
    <Stack.Navigator headerMode={false} initialRouteName={'Control'}>
      <Stack.Screen name="Control" component={ControlScreen} />
      <Stack.Screen name="Security" component={SecurityControl}></Stack.Screen>
      <Stack.Screen name="Power" component={PowerScreen}></Stack.Screen>
      <Stack.Screen name="SLogs" component={SecurityLogs}></Stack.Screen>
      <Stack.Screen
        name="ScreenAndCamera"
        component={ScreenAndCameraScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState(null);

  useEffect(async () => {
    const token = await check_if_key_existed();

    authHandler().then(async result => {
      console.log(result);
      switch (result) {
        case 'Matched':
          setAppState('Auth');
          store.dispatch(setAuthState(true, true, token));
          break;
        case 'Not Matched':
          store.dispatch(setAuthState(false, true, token));
          setAppState('noAuth');
          break;

        case 'No Token':
        case 'Not Valid':
          store.dispatch(setAuthState(false, false));
          setAppState('noAuth');
          break;

        default:
          store.dispatch(setAuthState(false, false));
          setAppState('noAuth');
          break;
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="#00ff00" />;
  switch (appState) {
    case 'Auth':
      return AuthStack;
    case 'noAuth':
      return noAuth;
    default:
      break;
  }
};

const AuthStack = (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <ToastMessage />

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
          component={Control}
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
  </Provider>
);

const noAuth = (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
