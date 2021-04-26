import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Colors, Text} from 'react-native-ui-lib';

export default function SecurityControl() {
  return (
    <View style={{backgroundColor: Colors.grey10, flex: 1}}>
      <View
        style={{
          padding: 10,
          paddingTop: 25,
        }}>
        <Text text50 style={{color: 'white'}}>
          Security Control
        </Text>
        <Text text70H style={{marginBottom: 10, color: 'white'}}>
          - Security Control is fast, secure way to lock your system if you left
          it behind you.
        </Text>
        <Text text70H style={{marginBottom: 10, color: 'white'}}>
          - You can either choose between Windows Lock (On the right) or
          Emergency locker.
        </Text>

        <Text text70H style={{marginBottom: 10, color: 'white'}}>
          - Windows Locker is the Normal Windows Lock Screen with your password.
          We logging any one lock or unlock it.
        </Text>
        <Text text70H style={{marginBottom: 5, color: 'white'}}>
          - Emergency Locker is OUR Locker. with some features:
        </Text>
        <Text text70H style={{marginBottom: 5, color: Colors.grey50}}>
          1- One Time Password (OTP): for every Lock session (Not constant
          password like Windows Locker).
        </Text>
        <Text text70H style={{marginBottom: 5, color: Colors.grey50}}>
          2- Secure: No One could unlock it or get rid of it or close it
        </Text>
        <Text text70H style={{marginBottom: 5, color: Colors.grey50}}>
          3- We use your pc camera to capture image for wrong retires to unlock
          Emergency Locker.
        </Text>
        <Text text70H style={{marginBottom: 5, color: Colors.grey50}}>
          4- Instant Notifications with every move
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 10,
        }}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            padding: 8,
            backgroundColor: Colors.dark80,
            borderRadius: 5,
            borderColor: Colors.grey70,
            borderWidth: 2,
            flex: 1,
            shadowOffset: {width: 10, height: 10},
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 3,
          }}>
          <Image
            source={require('../../assets/icons/lock.png')}
            style={{
              width: 48,
              height: 48,
              alignSelf: 'center',
              tintColor: 'green',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            padding: 8,
            backgroundColor: Colors.dark80,
            borderRadius: 5,
            elevation: 2,
            borderColor: Colors.grey70,
            borderWidth: 2,
            flex: 1,
          }}>
          <Image
            source={require('../../assets/icons/emergency.png')}
            style={{width: 48, height: 48, alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.blue10,
          paddingHorizontal: 10,
          width: '90%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text text50H center grey80>
          Tracking Logs
        </Text>
      </TouchableOpacity>
      <Text text90L center grey80>
        Last Update: 27 November 2020
      </Text>
    </View>
  );
}
