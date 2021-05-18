import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Colors, View} from 'react-native-ui-lib';
import Slider from '@react-native-community/slider';
import CardDetails from '../components/control/details';
import {addSocketToStore} from '../redux/actions/Socket.Action';
import {connect} from 'react-redux';
import {getTempKey} from '../lib/auth.handler';
import {showNewError} from '../redux/actions/Toast.Action';
import {emitOrder} from '../lib/socket.handler';
function ControlScreen({
  navigation,
  socket_state,
  is_pc_live,
  pcInfo,
  showNewError,
}) {
  const [currentVolume, setCurrentVolume] = React.useState(
    pcInfo ? parseFloat(pcInfo.current_volume * 100).toFixed(0) : 0,
  );

  return (
    <ScrollView>
      <Card
        onPress={() => navigation.navigate('Security')}
        elevation={2}
        row
        style={{
          backgroundColor: Colors.dark10,
          borderRadius: 0,
          paddingTop: 30,
        }}>
        <CardDetails
          type="Windows Lock"
          title="Security Control"
          time="27 November 2020"
          text={
            'With security control you can lock your PC with one click, Trigger Emergency Locker and see tracking reports.'
          }
        />
        <Card.Section
          imageSource={require('../assets/icons/lock.png')}
          imageStyle={{marginTop: 35}}
        />
      </Card>

      <Card
        onPress={() => navigation.navigate('Power')}
        elevation={2}
        row
        style={{
          backgroundColor: Colors.violet20,
          borderRadius: 0,
          paddingTop: 5,
        }}>
        <CardDetails
          type={'Shutdown'}
          title="Power Control"
          time="27 November 2020"
          text={
            'With power control you can shutdown and restart safely your pc with one click'
          }
        />
        <Card.Section
          imageSource={require('../assets/icons/power.png')}
          imageStyle={{marginTop: 35}}
        />
      </Card>

      <Card
        onPress={() => navigation.navigate('ScreenAndCamera')}
        elevation={2}
        row
        style={{
          backgroundColor: Colors.purple20,
          borderRadius: 0,
          paddingTop: 5,
        }}>
        <CardDetails
          type={'Screenshot'}
          title="Screen and Camera"
          time="27 November 2020"
          text={
            "Screen and Camera allows you to see what's going on your screen and capture image from your webcam if existed."
          }
        />
        <Card.Section
          imageSource={require('../assets/icons/camera.png')}
          imageStyle={{marginTop: 35, marginRight: 5}}
        />
      </Card>

      <Card
        row
        style={{
          backgroundColor: Colors.green10,
          borderRadius: 0,
          paddingTop: 5,
          flex: 1,
        }}>
        <CardDetails
          title="Media Control"
          text={'Change system volume, mute system and control your music'}
        />
        <Card.Section
          imageSource={require('../assets/icons/music.png')}
          imageStyle={{marginTop: 35, marginRight: 5}}
        />
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: Colors.green10,
          paddingBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            height: 40,
            borderRadius: 50,
            padding: 5,
            marginHorizontal: 5,
          }}
          onPress={async () => {
            if (is_pc_live) {
              await emitOrder(socket_state, 'MEDIA', 'PERVIOUS_MEDIA', '');
            } else {
              showNewError(
                "Your PC is not connected.. you can't trigger an event!",
                Colors.red20,
              );
            }
          }}>
          <Image
            style={{
              width: 32,
              height: 32,
              tintColor: Colors.blue20,
            }}
            source={require('../assets/icons/media/backward.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            height: 40,
            borderRadius: 50,
            padding: 5,
            marginHorizontal: 5,
          }}
          onPress={async () => {
            if (is_pc_live) {
              await emitOrder(socket_state, 'MEDIA', 'PLAY_PAUSE', '');
            } else {
              showNewError(
                "Your PC is not connected.. you can't trigger an event!",
                Colors.red20,
              );
            }
          }}>
          <Image
            style={{
              width: 32,
              height: 32,
              tintColor: Colors.blue20,
            }}
            source={require('../assets/icons/media/pause_play.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            height: 40,
            borderRadius: 50,
            padding: 5,
            marginHorizontal: 5,
          }}
          onPress={async () => {
            if (is_pc_live) {
              await emitOrder(socket_state, 'MEDIA', 'NEXT_MEDIA', '');
            } else {
              showNewError(
                "Your PC is not connected.. you can't trigger an event!",
                Colors.red20,
              );
            }
          }}>
          <Image
            style={{
              width: 32,
              height: 32,
              tintColor: Colors.blue20,
            }}
            source={require('../assets/icons/media/forward.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            if (is_pc_live) {
              await emitOrder(socket_state, 'MUTE_THE_SKY');
              setCurrentVolume(0);
            } else {
              showNewError(
                "Your PC is not connected.. you can't trigger an event!",
                Colors.red20,
              );
            }
          }}
          style={{
            backgroundColor: '#fff',
            height: 40,
            borderRadius: 50,
            padding: 5,
          }}>
          <Image
            style={{
              width: 32,
              height: 32,
              tintColor: Colors.blue20,
            }}
            source={require('../assets/icons/media/mute.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: Colors.green10, paddingHorizontal: 20}}>
        <Slider
          style={{flex: 1, height: 40}}
          minimumValue={0}
          maximumValue={100}
          onSlidingComplete={async e => {
            if (is_pc_live) {
              await emitOrder(socket_state, 'VOICE_THE_SKY', '', e.toFixed(0));
              setCurrentVolume(e.toFixed(0));
            } else {
              showNewError(
                "Your PC is not connected.. you can't trigger an event!",
                Colors.red20,
              );
            }
          }}
          value={parseInt(currentVolume)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => ({
  socket_state: state.Socket.socket,
  is_pc_live: state.PC.is_connected,
  pcInfo: state.PC.pc_info,
});

export default connect(mapStateToProps, {addSocketToStore, showNewError})(
  ControlScreen,
);
