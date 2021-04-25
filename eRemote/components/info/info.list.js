import {View, Text, Card, ListItem, Colors, Image} from 'react-native-ui-lib';
import React from 'react';

const InfoList = ({icon, title, info, lines}) => {
  const images = {
    windows: require('../../assets/icons/windows.png'),
    gpu: require('../../assets/icons/gpu.png'),
    network: require('../../assets/icons/network.png'),
    mic: require('../../assets/icons/mic.png'),
  };

  return (
    <View>
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}>
        <ListItem.Part left>
          <Image
            source={images[icon]}
            style={{margin: 5, marginRight: 10}}
            width={48}
            height={48}
          />
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={{paddingRight: 17}}>
          <ListItem.Part>
            <Text
              dark10
              text70
              style={{flex: 1, marginRight: 10}}
              numberOfLines={1}>
              {`${title}`}
            </Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text
              style={{flex: 1}}
              text90
              dark40
              numberOfLines={lines ? lines : 1}>{`${info}`}</Text>
          </ListItem.Part>
        </ListItem.Part>
      </ListItem>
    </View>
  );
};
export default InfoList;
