import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Card,
  Colors,
  ExpandableSection,
  ListItem,
  Text,
} from 'react-native-ui-lib';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {colorsHandler} from '../../../lib/security.logs.handler';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYzduYXNyIiwiYSI6ImNrNG4zOHludTByYzgzbG1pbHMxeWpleGQifQ.aVGDM-f4GZeKtcG2CLT7VA',
);
const SecurityLogsList = ({
  type,
  action,
  time,
  uuid,
  location,
  ip,
  password,
  image,
  source,
}) => {
  const images = {
    windows: require('../../../assets/icons/lock.png'),
    emergency: require('../../../assets/icons/emergency.png'),
  };

  const [openCard, setOpenCard] = React.useState(false);
  return (
    <>
      <View row center margin-20>
        <Card
          row
          onPress={() => setOpenCard(!openCard)}
          style={{marginBottom: 15}}>
          <Card.Section
            centerV
            imageSource={images[type]}
            imageStyle={{
              marginLeft: 10,
              width: 48,
              height: 48,
              tintColor: type === 'windows' ? 'red' : '',
            }}
          />
          {colorsHandler(type, time, uuid, ip, action, source)}
        </Card>
        <ExpandableSection expanded={openCard}>
          <View style={styles.container}>
            <MapboxGL.MapView
              style={{
                width: Dimensions.get('screen').width,
                height: 200,
                borderRadius: 10,
              }}
              zoomEnabled={false}>
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[29.9490615, 31.2100585]}
              />
              <MapboxGL.PointAnnotation
                key={'9090'}
                id={'9090'}
                coordinate={[29.9490615, 31.2100585]}>
                <MapboxGL.Callout title={'Unlock/Lock Location'} />
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
            {type === 'emergency' ? (
              <View style={{padding: 15}}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      height: Dimensions.get('window').height / 4,
                      borderRadius: 15,
                    }}
                  />
                ) : (
                  <Text center text90 grey40>
                    There's No Camera Detected so we aren't able to take photo
                    of attacker
                  </Text>
                )}
                <Text red20 center style={{marginHorizontal: 15, marginTop: 3}}>
                  Entered Password: {password}
                </Text>
              </View>
            ) : null}
          </View>
        </ExpandableSection>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey70,
    marginBottom: 20,
    borderRadius: 20,
  },
  map: {
    flex: 1,
  },
});
export default SecurityLogsList;
