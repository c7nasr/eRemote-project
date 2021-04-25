import {View, Text, Image, Button} from 'react-native-ui-lib';

import React from 'react';
import {Linking} from 'react-native';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      <Image
        source={require('./../assets/logo.png')}
        width={200}
        height={150}
      />
      <Text text20H dark10 center>
        nxxx-xxxx-xxxx
      </Text>
      <Text text70H dark30 center>
        Enter Code Above in the PC Client to Start Authentication Process
      </Text>
      <Button outline label="I've entered the Code on PC Client" marginT-10 />
      <Text
        text80H
        green10
        style={{marginTop: 10}}
        onPress={() => Linking.openURL('https://eremote.tech')}>
        If you don't have the PC Client click here
      </Text>
    </View>
  );
}

export default HomeScreen;
