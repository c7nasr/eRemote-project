import {
  View,
  Text,
  Card,
  ListItem,
  Colors,
  Image,
  Chip,
} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import InfoList from '../components/info/info.list';
import InfoChips from '../components/info/info.chips';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYzduYXNyIiwiYSI6ImNrNG4zOHludTByYzgzbG1pbHMxeWpleGQifQ.aVGDM-f4GZeKtcG2CLT7VA',
);

function InfoScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Card.Section
          // Determine According to Online State
          backgroundColor={'#1e6f5c'}
          content={[
            {text: '{{PC USERNAME}}', text60: true, grey80: true},
            {
              text:
                'Your PC is online and reachable by us you can start controlling it. Last Update: {{Y minutes ago}}.',
              text80: true,
              grey60: true,
            },
            {
              text: '{{nxxx-xxxx-xxxx}} - XXX.XXX.XXX',
              text90: true,
              grey50: true,
            },
          ]}
          style={{
            padding: 20,
            flex: 1,
            paddingTop: 40,
            borderBottomColor: '#206a5d',
            borderBottomWidth: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}
        />

        <InfoList icon="windows" info="OS NAME" title="System" />
        <InfoList
          icon="gpu"
          info="We Detected {} GPU and {} CPU. {} Ram"
          title="Core"
        />
        <InfoList
          lines={2}
          icon="mic"
          info="We Detected {1} Camera and 1 {Microphone} and {0} Speakers."
          title="Media"
        />

        <InfoChips />

        <InfoList
          lines={2}
          icon="network"
          info="Your IP: {} and Mac address: {}"
          title="Network"
        />
        <View style={{backgroundColor: 'white'}}>
          <Text text60BL grey20 center>
            Last Known Location
          </Text>
          <Text text90L grey40 center marginB-8>
            27 November 2020@09:00am
          </Text>
        </View>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} zoomEnabled={false}>
            <MapboxGL.Camera
              zoomLevel={14}
              centerCoordinate={[29.9490615, 31.2100585]}
            />
            <MapboxGL.PointAnnotation
              key={'9090'}
              id={'9090'}
              coordinate={[29.9490615, 31.2100585]}>
              <MapboxGL.Callout title={'Your PC'} />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default InfoScreen;
