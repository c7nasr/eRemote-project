import {useFocusEffect} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {ActionSheet, Colors, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {createNewOrder} from '../../lib/api';
import {getUserLocation} from '../../lib/maps.handler';
import {
  AuthPrompt,
  is_biometric_available,
} from '../../lib/secuirty.unlock.handler';
import {emitOrder} from '../../lib/socket.handler';
import {timestampToDate} from '../../lib/time.lib';
import {showNewError} from '../../redux/actions/Toast.Action';

function SecurityControl({
  navigation,
  reports,
  socket_state,
  is_pc_live,
  showNewError,
  is_desktop_locked,
}) {
  const [isELocked, setIsELocked] = useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [unlockModel, setUnlockModel] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsAuth(false);

      return () => setIsAuth(false);
    }, [isAuth]),
  );
  return (
    <View style={{backgroundColor: Colors.grey10, flex: 1}}>
      {isELocked && (
        <ActionSheet
          onDismiss={_ => {
            setIsAuth(false);
            setUnlockModel(false);
          }}
          options={[{label: 'Done', onPress: () => setUnlockModel(false)}]}
          title="Unlock Code: ngwr-tr35-mbo1"
          visible={unlockModel}
        />
      )}

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
          }}
          onPress={async () => {
            if (!is_desktop_locked) {
              const order = await createNewOrder('INSTANT_LOCK');
              console.log(order);
              if (is_pc_live) {
                emitOrder(
                  socket_state,
                  'INSTANT_LOCK',
                  order.new_order._id,
                  'Mobile',
                );
              } else {
                showNewError(
                  'Order Registered. it will be executed with your pc become live',
                  Colors.green20,
                );
              }
            } else {
              showNewError('Your Desktop is ALREADY Locked.', Colors.red20);
            }
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
        {!isELocked ? (
          <>
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
          </>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              if (await is_biometric_available()) {
                AuthPrompt().then(Auth => {
                  if (Auth) {
                    setUnlockModel(true);
                  }
                });
              } else if (!(await is_biometric_available())) {
                setUnlockModel(true);
              }
            }}
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
              source={require('../../assets/icons/unlock.png')}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
                tintColor: '#2b2e4a',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SLogs')}
        style={{
          backgroundColor: Colors.blue10,
          paddingHorizontal: 10,
          width: '90%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingVertical: 10,
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <Text text50H center grey80>
          Security Reports
        </Text>
      </TouchableOpacity>
      {reports && (
        <Text text90L center grey80>
          Last Update:
          {reports.length > 0 && timestampToDate(reports[0][0].timestamp)}
        </Text>
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  reports: state.Reports.security,
  socket_state: state.Socket.socket,
  is_pc_live: state.PC.is_connected,
  is_desktop_locked: state.PC.pc_info.is_desktop_locked,
});

export default connect(mapStateToProps, {showNewError})(SecurityControl);
