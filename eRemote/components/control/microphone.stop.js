import React from 'react';
import {Image, View} from 'react-native';
import {Colors, Text, TouchableOpacity} from 'react-native-ui-lib';
import {makeOrderID} from '../../lib/microphone.handler';
import {emitOrder} from '../../lib/socket.handler';

function MicrophoneStop({
  socket_state,
  showNewError,
  is_pc_live,
  is_live,
  StartMicrophone,
}) {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (is_pc_live) {
          await emitOrder(
            socket_state,
            'AUDIO_CHUNKS',
            makeOrderID(32),
            'Mobile',
          );
          return StartMicrophone();
        }

        showNewError('Your PC is not LIVE..', Colors.red20, 5000, 'top');
      }}>
      <Image
        style={{
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={require('../../assets/icons/microphone_off.png')}
      />
      <Text dark80 center text65>
        Click here to start
      </Text>
    </TouchableOpacity>
  );
}

export default MicrophoneStop;
