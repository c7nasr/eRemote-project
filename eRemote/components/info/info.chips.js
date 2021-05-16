import React from 'react';
import {Chip, View, Colors} from 'react-native-ui-lib';

export default function InfoChips({
  is_desktop_locked,
  battery_percentage,
  is_have_battery,
  current_volume,
}) {
  return (
    <View
      flex
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
      <Chip
        backgroundColor={Colors.purple30}
        label={'Desktop Locked'}
        labelStyle={{
          color: 'white',
        }}
        badgeProps={{
          label: `${is_desktop_locked ? 'YES' : 'NO'}`,
          backgroundColor: Colors.purple50,
        }}
        containerStyle={{
          borderColor: Colors.purple70,
          borderWidth: 1,
          padding: 2,
          marginLeft: 1,
        }}
      />

      <Chip
        backgroundColor={Colors.red30}
        label={'Battery Percentage'}
        labelStyle={{
          color: 'white',
        }}
        badgeProps={{
          label: `${is_have_battery ? battery_percentage : '0%'}`,
          backgroundColor: Colors.red10,
        }}
        containerStyle={{
          borderColor: Colors.red70,
          borderWidth: 1,
          padding: 2,
          marginLeft: 1,
        }}
      />

      <Chip
        backgroundColor={Colors.blue30}
        label={'Current Volume'}
        labelStyle={{
          color: 'white',
        }}
        badgeProps={{
          label: `${current_volume * 100}%`,
          backgroundColor: Colors.blue10,
        }}
        containerStyle={{
          borderColor: Colors.blue70,
          borderWidth: 1,
          padding: 2,
          marginLeft: 1,
        }}
      />
    </View>
  );
}
