import {View, Text, Image, Button, Colors, Toast} from 'react-native-ui-lib';

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {connect} from 'react-redux';
import {tryToConnect, getNewKey} from '../lib/api';
import {check_if_key_existed, setToken} from '../lib/auth.handler';
import {setAuthState} from '../redux/actions/Auth.Action';
import {showNewError} from '../redux/actions/Toast.Action';
import ToastMessage from './../components/toast';

function HomeScreen({auth, setAuthState, showNewError, navigation}) {
  const [Key, setKey] = useState(null);

  useEffect(() => {
    check_if_key_existed().then(async token => {
      if (token) {
        const res = await tryToConnect(token);
        if (res !== 'Network Error') {
          setKey(res.key);
        } else {
          showNewError(
            "Can't connect to the internet please check your internet connection and try again.",
            Colors.red10,
          );
        }

        if (res.matched) {
          navigation.navigate('Control', {screen: 'Control'});
        }
      } else {
        const data = await getNewKey();
        if (data != 'Network Error') {
          setToken(data.token);
          setAuthState(false, true, data.token);
        } else {
          showNewError(
            "Can't connect to the internet please check your internet connection and try again.",
            Colors.red10,
          );
        }
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      <ToastMessage />
      <Image
        source={require('./../assets/logo.png')}
        width={200}
        height={150}
      />
      {!Key ? (
        <ActivityIndicator size="large" color={Colors.green50} />
      ) : (
        <Text text30H dark10 center>
          {Key}
        </Text>
      )}
      <Text text70H dark30 center>
        Enter Code Above in the PC Client to Start Authentication Process
      </Text>
      <Button
        disabled={!Key ? true : false}
        outline
        label="I've entered the Code on PC Client"
        marginT-10
        onPress={async () => {
          const is_matched = await tryToConnect(auth.token);
          if (is_matched === 'Network Error') {
            showNewError(
              "Something Went Error. We Can't Reach the server",
              Colors.red10,
            );
          } else {
            switch (is_matched.matched) {
              case true:
                showNewError(
                  'Key is Matched... we logging you in now',
                  Colors.green10,
                );
                navigation.navigate('Control', {screen: 'Control'});
                break;
              case false:
                showNewError(
                  'Key is Not Matched. Please Enter the code on PC Client and Click Connect on PC Client and try again.',
                  Colors.red10,
                );
              default:
                break;
            }
          }
          console.log(is_matched);
        }}
      />
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

const mapStateToProps = state => ({
  auth: state.Auth,
});
export default connect(mapStateToProps, {setAuthState, showNewError})(
  HomeScreen,
);
