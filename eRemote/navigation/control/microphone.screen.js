import React from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Colors, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import MicrophoneStart from '../../components/control/microphone.start';
import MicrophoneStop from '../../components/control/microphone.stop';
import {showNewError} from '../../redux/actions/Toast.Action';
import * as blobUtil from 'blob-util';

import {
  StartMicrophone,
  StopMicrophone,
} from '../../redux/actions/Microphone.Action';
const MicrophoneScreen = ({
  socket_state,
  is_pc_live,
  is_live,
  StartMicrophone,
  StopMicrophone,
  navigation,
  showNewError,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (socket_state && is_pc_live) {
        socket_state.on('RECORD_BUFFER', async function ({data}) {
          var blob = blobUtil.arrayBufferToBlob(data, 'audio/mpeg');
          var myUrl = blobUtil.createObjectURL(blob);

          console.log(myUrl);
        });
      }

      if (!is_pc_live) StopMicrophone();

      // Do something when the screen is focused

      return () => {
        StopMicrophone();
      };
    }, [is_pc_live]),
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.blue10}}>
      <View
        style={{
          padding: 10,
          paddingTop: 25,
        }}>
        <Text text50 style={{color: 'white'}}>
          Microphone Control
        </Text>
        <Text text70 style={{color: 'white'}}>
          Microphone Control allow you to listen LIVE to what surround your
          PC/Laptop.
        </Text>
        <Text text70 style={{color: 'white'}}>
          Current Status: {is_live ? 'on' : 'off'}
        </Text>

        {is_live ? (
          <MicrophoneStart
            showNewError={showNewError}
            is_live={is_live}
            is_pc_live={is_pc_live}
            socket_state={socket_state}
            StopMicrophone={StopMicrophone}
          />
        ) : (
          <MicrophoneStop
            showNewError={showNewError}
            is_live={is_live}
            is_pc_live={is_pc_live}
            socket_state={socket_state}
            StartMicrophone={StartMicrophone}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  socket_state: state.Socket.socket,
  is_pc_live: state.PC.is_connected,
  is_live: state.Microphone.is_live,
});

export default connect(mapStateToProps, {
  StartMicrophone,
  StopMicrophone,
  showNewError,
})(MicrophoneScreen);
