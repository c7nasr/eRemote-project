import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text, Colors, Slider} from 'react-native-ui-lib';

export default function MediaScreen() {
  return (
    <View style={{flex: 1, backgroundColor: Colors.green10}}>
      <View
        style={{
          padding: 10,
          paddingTop: 25,
        }}>
        <Text text50 style={{color: 'white'}}>
          Media Control
        </Text>
        <Text text70 style={{color: 'white'}}>
          Control system volume, mute, control playing media with one click.
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            marginTop: 50,
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
              source={require('../../assets/icons/media/backward.png')}
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
              source={require('../../assets/icons/media/pause_play.png')}
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
              source={require('../../assets/icons/media/forward.png')}
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
              source={require('../../assets/icons/media/mute.png')}
            />
          </TouchableOpacity>
        </View>
        <Slider
          onValueChange={e => console.log(e)}
          value={58}
          minimumValue={0}
          maximumValue={100}
          containerStyle={{marginTop: 80}}
          step={1}
        />
      </View>
    </View>
  );
}
