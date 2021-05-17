import {View, Text, Card, Colors} from 'react-native-ui-lib';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import InfoList from '../components/info/info.list';
import InfoChips from '../components/info/info.chips';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {formatTime} from '../lib/time.lib';
import {getConnectionText} from '../lib/texts';
import {
  updatePcConnectionState,
  updatePCInfo,
} from '../redux/actions/PC.Action';
import {connect} from 'react-redux';
import {initSocket} from '../lib/socket.handler';
import {getTempKey} from '../lib/auth.handler';

function InfoScreen({
  updatePCInfo,
  pcInfo,
  is_loading,
  is_connected,
  updatePcConnectionState,
}) {
  React.useEffect(() => {
    try {
      updatePCInfo();
      const initSocketAsync = async () => {
        let socket = await initSocket();
        if (socket) return socket;
        return false;
      };

      initSocketAsync().then(async socket => {
        const key = await getTempKey();
        console.log(`getTempKey: ${key}`);
        if (socket != false) {
          socket.on('connect', function () {
            console.log(socket.connected);
          });
          socket.on('turn_on', function (object) {
            updatePcConnectionState(true);
          });
          socket.on('emitIsActive', async function (data) {
            let key = await getTempKey();
            console.log(`inEmitIsActive: ${JSON.stringify(key)}`);
            if (data.key == key && !data.isActive) {
              updatePcConnectionState(false);
            } else {
              updatePcConnectionState(true);
            }
          });
          socket.emit('isActive', {
            key: key,
            source: 'Mobile',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiYzduYXNyIiwiYSI6ImNrNG4zOHludTByYzgzbG1pbHMxeWpleGQifQ.aVGDM-f4GZeKtcG2CLT7VA',
    );
  }, []);
  if (is_loading)
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size="large"
        color="#00ff00"
      />
    );
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={is_loading}
            onRefresh={async () => await updatePCInfo()}
          />
        }>
        <Card.Section
          backgroundColor={is_connected ? '#1e6f5c' : Colors.red20}
          content={[
            {text: pcInfo.username, text60: true, grey80: true},
            {
              text: getConnectionText(is_connected, pcInfo.createdAt),
              text80: true,
              grey60: true,
            },
            {
              text: `${pcInfo.key} - ${pcInfo.ip}`,
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

        <InfoList icon="windows" info={pcInfo.system} title="System" />
        <InfoList
          icon="gpu"
          info={`We Detected ${pcInfo.gpu} GPU and ${pcInfo.cpu} CPU. ${pcInfo.ram} GB memory`}
          title="Core"
          lines={3}
        />
        <InfoList
          lines={2}
          icon="mic"
          info={`We Detected ${pcInfo.cam ? '1' : '0'} Camera and ${
            pcInfo.mic ? '1' : '0'
          } Microphone and ${pcInfo.is_have_speakers ? '1' : '0'} Speakers.`}
          title="Media"
        />

        <InfoChips
          is_desktop_locked={pcInfo.is_locked}
          battery_percentage={pcInfo.battery_percentage}
          is_have_battery={pcInfo.battery}
          current_volume={pcInfo.current_volume}
        />

        <InfoList
          lines={2}
          icon="network"
          info={`Your IP: ${pcInfo.ip} and Mac address: ${pcInfo.mac_address}`}
          title="Network"
        />
        <View style={{backgroundColor: 'white'}}>
          <Text text60BL grey20 center>
            Last Known Location
          </Text>
          <Text text90L grey40 center marginB-8>
            {formatTime(pcInfo.updatedAt)}
          </Text>
        </View>
        {pcInfo.last_location != '' ? (
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map} zoomEnabled={false}>
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[
                  pcInfo?.last_location.split(',')[1],
                  pcInfo?.last_location.split(',')[0],
                ]}
              />
              <MapboxGL.PointAnnotation
                key={'9090'}
                id={'9090'}
                coordinate={[
                  pcInfo?.last_location.split(',')[1],
                  pcInfo?.last_location.split(',')[0],
                ]}>
                <MapboxGL.Callout title={'Your PC'} />
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
          </View>
        ) : null}
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
const mapStateToProps = state => ({
  pcInfo: state.PC.pc_info,
  is_loading: state.PC.is_loading,
  is_connected: state.PC.is_connected,
});

export default connect(mapStateToProps, {
  updatePCInfo,
  updatePcConnectionState,
})(InfoScreen);
