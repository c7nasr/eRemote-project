import React from 'react';
import {View, Image} from 'react-native';
import {ListItem, Text} from 'react-native-ui-lib';

export default function PowerListItem({type, date, source}) {
  const images = {
    Shutdown: require('../../assets/icons/shutdown.png'),
    Restart: require('../../assets/icons/restart.png'),
  };
  return (
    <ListItem
      height={77.5}
      containerStyle={{borderRadius: 10, marginBottom: 8}}>
      <ListItem.Part left>
        <Image
          source={images[type]}
          style={{
            tintColor: type === 'Restart' ? 'blue' : 'red',
            width: 48,
            height: 48,
            padding: 5,
            marginHorizontal: 10,
          }}
        />
      </ListItem.Part>
      <ListItem.Part middle column containerStyle={{paddingRight: 17}}>
        <ListItem.Part>
          <Text
            dark10
            text70L
            style={{flex: 1, marginRight: 10}}
            numberOfLines={1}>
            {`${type} Order`}
          </Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text
            style={{flex: 1, marginRight: 10}}
            text90
            dark40
            numberOfLines={2}>
            {`${date}`}
          </Text>
        </ListItem.Part>

        <ListItem.Part>
          <Text dark10 text90L numberOfLines={1}>
            {`From ${source}`}
          </Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );
}
