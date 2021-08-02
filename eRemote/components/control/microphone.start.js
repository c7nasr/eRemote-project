import React from 'react';
import {Image, View} from 'react-native';
import {Colors, Text, TouchableOpacity} from 'react-native-ui-lib';
import {emitOrder} from '../../lib/socket.handler';

function MicrophoneStart({socket_state, is_live, StopMicrophone, is_pc_live}) {
  return (
    <TouchableOpacity
      onPress={async () => {
        await emitOrder(socket_state, 'STOP_LISTEN', 'UUID4', 'Mobile');

        StopMicrophone();
      }}>
      <Image
        style={{
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={require('../../assets/icons/microphone_on.png')}
      />
      <Text dark80 center text65>
        Click here to stop
      </Text>
    </TouchableOpacity>
  );
}

export default MicrophoneStart;
