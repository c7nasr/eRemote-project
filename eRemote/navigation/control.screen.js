import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Colors, Slider, View} from 'react-native-ui-lib';
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
      <Slider
        onValueChange={e => console.log(e)}
        value={1}
        minimumValue={0}
        maximumValue={100}
        containerStyle={{
          backgroundColor: Colors.green10,
          flex: 1,
        }}
        step={1}
      />
    </ScrollView>
  );
}

export default ControlScreen;
