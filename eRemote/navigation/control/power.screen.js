import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import PowerListItem from '../../components/control/power.list.item';
import {createNewOrder, getPowerData} from '../../lib/api';
import {emitOrder} from '../../lib/socket.handler';
import {formatTime} from '../../lib/time.lib';
import {getPowerHistory} from '../../redux/actions/Power.Action';
import {showNewError} from '../../redux/actions/Toast.Action';
function PowerScreen({
  getPowerHistory,
  socket_state,
  is_pc_live,
  power_history,
  showNewError,
}) {
  useEffect(() => {
    if (socket_state) {
      socket_state.on('SHUTDOWN_REPLAY', async function ({data, room}) {
        showNewError('Your PC is Shutting Down. See You Later', Colors.green20);
      });

      socket_state.on('RESTART_REPLAY', async function ({data, room}) {
        showNewError(
          'Your PC is Restarting. See You in a moment',
          Colors.green20,
        );
      });
    }

    getPowerData().then(data => {
      getPowerHistory(data.power);
    });
  }, []);
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
        {power_history && power_history[0]?.createdAt ? (
          <Text text80L style={{color: 'white'}}>
            Last Order was {formatTime(power_history[0]?.createdAt)}
          </Text>
        ) : null}
        {power_history && power_history.length > 0 ? (
          <ScrollView
            style={{
              height: Dimensions.get('screen').height * 0.6,
              marginTop: 15,
            }}>
            {power_history.map(element => (
              <PowerListItem
                key={element._id}
                source={element.source}
                type={
                  element.order == 'RESTART_THE_SKY' ? 'Restart' : 'Shutdown'
                }
                date={formatTime(element.createdAt)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text text50BL center grey70>
            There's no Pervious Power Logs
          </Text>
        )}
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
            }}
            disabled={!socket_state}
            onPress={async () => {
              const newRestartOrder = await createNewOrder('RESTART_THE_SKY');
              if (is_pc_live) {
                await emitOrder(
                  socket_state,
                  'RESTART_THE_SKY',
                  newRestartOrder.new_order._id,
                  'Mobile',
                );
                setIncomingScreenshot(newRestartOrder.new_order, '');
              } else {
                showNewError(
                  'Order Registered and it will be executed when your pc is become live. We Will Send you a Notification',
                );
              }
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

          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              padding: 8,
              backgroundColor: Colors.dark80,
              borderRadius: 5,
              elevation: 2,
              borderColor: Colors.grey70,
              borderWidth: 2,
            }}
            disabled={!socket_state}
            onPress={async () => {
              const newShutdownOrder = await createNewOrder('SHUTDOWN_THE_SKY');
              if (is_pc_live) {
                await emitOrder(
                  socket_state,
                  'SHUTDOWN_THE_SKY',
                  newShutdownOrder.new_order._id,
                  'Mobile',
                );
                setIncomingScreenshot(newShutdownOrder.new_order, '');
              } else {
                showNewError(
                  'Order Registered and it will be executed when your pc is become live. We Will Send you a Notification',
                );
              }
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
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = state => ({
  socket_state: state.Socket.socket,
  is_pc_live: state.PC.is_connected,
  power_history: state.Power.history,
});

export default connect(mapStateToProps, {getPowerHistory, showNewError})(
  PowerScreen,
);
