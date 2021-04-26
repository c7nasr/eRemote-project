import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, ListItem, Text} from 'react-native-ui-lib';
import PowerListItem from '../../components/control/power.list.item';

export default function PowerScreen() {
  return (
    <View style={{flex: 1, backgroundColor: Colors.violet20}}>
      <View
        style={{
          padding: 10,
          paddingTop: 25,
        }}>
        <Text text50 style={{color: 'white'}}>
          Power Control
        </Text>
        <Text text70 style={{color: 'white'}}>
          Shutdown or Restart your system safely remotely.
        </Text>
        <Text text50 style={{color: 'white'}}>
          Power Control History
        </Text>
        <Text text80L style={{color: 'white'}}>
          Last Update: 27 November 2020
        </Text>
        <ScrollView
          style={{
            height: Dimensions.get('screen').height * 0.6,
            marginTop: 15,
          }}>
          <PowerListItem
            source={'Website'}
            type="Restart"
            date="27 November 2020 @ 11:40am"
          />
          <PowerListItem
            source={'Website'}
            type="Restart"
            date="27 November 2020 @ 11:40am"
          />
          <PowerListItem
            source={'Website'}
            type="Restart"
            date="27 November 2020 @ 11:40am"
          />

          <PowerListItem
            source={'Website'}
            type="Restart"
            date="27 November 2020 @ 11:40am"
          />
          <PowerListItem
            source={'App'}
            type="Shutdown"
            date="27 November 2020 @ 11:40am"
          />
          <PowerListItem
            source={'App'}
            type="Shutdown"
            date="27 November 2020 @ 11:40am"
          />
          <PowerListItem
            source={'App'}
            type="Shutdown"
            date="27 November 2020 @ 11:40am"
          />
        </ScrollView>

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
              source={require('../../assets/icons/shutdown.png')}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
                tintColor: 'red',
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
              source={require('../../assets/icons/restart.png')}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
                tintColor: 'blue',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
