import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Text, ListItem} from 'react-native-ui-lib';

const ScreenListItem = ({image, date, source}) => {
  return (
    <ListItem
      containerStyle={{
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ListItem.Part
        column
        containerStyle={{backgroundColor: 'white', borderRadius: 50}}>
        <ListItem.Part
          containerStyle={{backgroundColor: 'white', borderRadius: 50}}>
          <Image
            resizeMode="cover"
            style={{
              width: Dimensions.get('screen').width - 30,
              height: 300,
              backgroundColor: 'white',
              borderRadius: 5,
            }}
            source={{uri: image}}
          />
        </ListItem.Part>
        <ListItem.Part
          containerStyle={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}>
          <Text center dark10>
            {date}
          </Text>
        </ListItem.Part>

        <ListItem.Part
          containerStyle={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <Text dark10 text90L style={{marginBottom: 5}}>
            {`From ${source}`}
          </Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );
};

export default ScreenListItem;
