import {View, Text, Image, Button, Colors} from 'react-native-ui-lib';

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {connect} from 'react-redux';
import {apiHandler} from '../lib/api';
import {check_if_key_existed, setToken} from '../lib/auth.handler';
import {setAuthState} from '../redux/actions/Auth.Action';

function HomeScreen({auth, setAuthState}) {
  const [Key, setKey] = useState(null);
  // Check State for Token. if found decrypt it.
  // if not request new key
  useEffect(() => {
    check_if_key_existed().then(token => {
      if (token) {
        apiHandler('post', 'keys/connect/phone', {}, token).then(result => {
          if (result === false) {
            setToken('');
            console.log('!result', result);
          } else {
            setKey(result.key);
            console.log(result);
          }
        });
      } else {
        apiHandler('get', 'keys', {}).then(result => {
          setToken(result.token);
          setAuthState(false, true, result.token);
        });
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

const mapStateToProps = state => ({
  auth: state.Auth,
});
export default connect(mapStateToProps, {setAuthState})(HomeScreen);
