import React from 'react';
import {ScrollView} from 'react-native';
import {Card, Colors, View} from 'react-native-ui-lib';
import CardDetails from '../components/control/details';

function ControlScreen({navigation}) {
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
        elevation={2}
        row
        style={{
          backgroundColor: Colors.orange20,
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
        elevation={2}
        row
        style={{
          backgroundColor: Colors.green10,
          borderRadius: 0,
          paddingTop: 5,
        }}>
        <CardDetails
          title="Media Control"
          text={
            'Change system volume, mute system and control your music (Forward, Back, Start, Pause) with one click.'
          }
        />
        <Card.Section
          imageSource={require('../assets/icons/music.png')}
          imageStyle={{marginTop: 35, marginRight: 5}}
        />
      </Card>
    </ScrollView>
  );
}

export default ControlScreen;
