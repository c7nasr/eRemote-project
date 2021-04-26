import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Colors} from 'react-native-ui-lib';
import ScreenListItem from '../../components/control/screen.list.item';

export default function ScreenAndCameraScreen() {
  return (
    <View style={{flex: 1, backgroundColor: Colors.purple20, flexWrap: 'wrap'}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            padding: 10,
            paddingTop: 25,
          }}>
          <Text text50 style={{color: 'white'}}>
            Screen And Camera Control
          </Text>
          <Text text70 style={{color: 'white', marginBottom: 5}}>
            Control you PC camera and Take Screenshots from your screen
            (INSTANTLY) with one click.
          </Text>
          <Text text50 style={{color: 'white'}}>
            Screenshots History
          </Text>
          <Text text80L style={{color: 'white'}}>
            Last Update: 27 November 2020 @ 01:14pm.
          </Text>

          <View style={{height: 230}}>
            <ScrollView
              horizontal={true}
              style={{
                marginTop: 5,
                height: 120,
              }}>
              <ScreenListItem
                date={'27 November 2020 @ 01:00am'}
                source="Website"
                image="https://i.vgy.me/85Ve41.jpg"
              />

              <ScreenListItem
                date={'27 November 2020 @ 01:00am'}
                source="Website"
                image="https://i.vgy.me/J75kVN.jpg"
              />
            </ScrollView>
          </View>

          <Text text50 style={{color: 'white', marginTop: 5, marginTop: 0}}>
            Camera History
          </Text>
          <Text text80L style={{color: 'white'}}>
            Last Update: 27 November 2020 @ 01:14pm
          </Text>

          <View>
            <ScrollView horizontal={true} style={{height: 200, marginTop: 5}}>
              <ScreenListItem
                date={'27 November 2020 @ 01:00am'}
                source="Website"
                image="https://i.vgy.me/85Ve41.jpg"
              />

              <ScreenListItem
                date={'27 November 2020 @ 01:00am'}
                source="Website"
                image="https://i.vgy.me/J75kVN.jpg"
              />
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 10,
          }}>
          <TouchableOpacity
            style={{
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
            }}>
            <Image
              source={require('../../assets/icons/screenshot.png')}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
                tintColor: '#046582',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              padding: 8,
              backgroundColor: Colors.dark80,
              borderRadius: 5,
              elevation: 2,
              borderColor: Colors.grey70,
              borderWidth: 2,
            }}>
            <Image
              source={require('../../assets/icons/camera_2.png')}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
                tintColor: '#114e60',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
