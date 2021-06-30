import React from 'react';
import {FlatList, Image, Modal, TouchableOpacity, View} from 'react-native';
import {Text, Colors, ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import ScreenListItem from '../../components/control/screen.list.item';
import {createNewOrder, getCameraData, getScreenshotData} from '../../lib/api';
import {emitOrder} from '../../lib/socket.handler';
import {formatTime} from '../../lib/time.lib';
import {
  getCameraHistory,
  getScreenshotHistory,
  setImageViewerImage,
  setIncomingCamera,
  setIncomingScreenshot,
  toggleImageViewer,
} from '../../redux/actions/ScreenAndCamera.Action';
import {showNewError} from '../../redux/actions/Toast.Action';
import ImageViewer from 'react-native-image-zoom-viewer';
function ScreenAndCameraScreen({
  getScreenshotHistory,
  setIncomingScreenshot,
  socket_state,
  is_pc_live,
  screenshot_history,
  getCameraHistory,
  incoming_screenshot,
  setIncomingCamera,
  camera_history,
  setImageViewerImage,
  toggleImageViewer,
  is_model_open,
  current_model_photo,
  incoming_camera,
}) {
  React.useEffect(() => {
    setIncomingScreenshot({}, '');
    setIncomingCamera({}, '');

    if (socket_state) {
      socket_state.on('SCREENSHOT_IMAGE', async function ({data, room}) {
        var data = `data:image/png;base64,${data}`;

        setIncomingScreenshot({active: false}, data);
      });

      socket_state.on('CAMERA_IMAGE', async function ({data, room}) {
        var data = `data:image/png;base64,${data}`;
        setIncomingCamera({active: false}, data);
      });
    }

    getScreenshotData().then(data => {
      getScreenshotHistory(data.screenshots);
    });

    getCameraData().then(data => {
      getCameraHistory(data.camera);
    });
  }, []);

  const [expandScreenshot, setExpandScreenshot] = React.useState(false);
  const [expandCamera, setExpandCamera] = React.useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.grey10}}>
      <Modal
        visible={is_model_open}
        hardwareAccelerated={true}
        onRequestClose={() => toggleImageViewer(false)}>
        <ImageViewer
          onCancel={() => toggleImageViewer(false)}
          enableSwipeDown
          saveToLocalByLongPress
          imageUrls={[
            {
              url: current_model_photo,
            },
          ]}
        />
      </Modal>
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

        <ExpandableSection
          expanded={expandScreenshot && screenshot_history.length > 0}
          sectionHeader={
            <>
              <Text text50 style={{color: 'white'}}>
                Screenshots History
              </Text>
              {screenshot_history.length > 0 ? (
                <Text text80L style={{color: 'white', marginBottom: 3}}>
                  Last Update: {formatTime(screenshot_history[0].createdAt)}
                </Text>
              ) : (
                <Text text80L style={{color: 'white', marginBottom: 3}}>
                  There's no Screenshot History
                </Text>
              )}
              <Text text90L style={{color: 'white', marginBottom: 3}}>
                Click to Expand
              </Text>
            </>
          }
          onPress={() => setExpandScreenshot(!expandScreenshot)}>
          {incoming_screenshot.base_url ? (
            <ScreenListItem
              setImageViewerImage={setImageViewerImage}
              toggleImageViewer={toggleImageViewer}
              item={incoming_screenshot}
            />
          ) : null}
          <FlatList
            data={screenshot_history}
            renderItem={({item}) => (
              <ScreenListItem
                item={item}
                setImageViewerImage={setImageViewerImage}
                toggleImageViewer={toggleImageViewer}
              />
            )}
            keyExtractor={item => item._id}
            removeClippedSubviews={true}
          />
        </ExpandableSection>

        <ExpandableSection
          expanded={expandCamera && camera_history.length > 0}
          sectionHeader={
            <>
              <Text text50 style={{color: 'white'}}>
                Camera History
              </Text>
              {camera_history.length > 0 ? (
                <Text text80L style={{color: 'white', marginBottom: 3}}>
                  Last Update: {formatTime(camera_history[0].createdAt)}
                </Text>
              ) : (
                <Text text80L style={{color: 'white', marginBottom: 3}}>
                  There's no Camera History
                </Text>
              )}
            </>
          }
          onPress={() => setExpandCamera(!expandCamera)}>
          {incoming_camera.base_url ? (
            <ScreenListItem
              setImageViewerImage={setImageViewerImage}
              toggleImageViewer={toggleImageViewer}
              item={incoming_camera}
            />
          ) : null}
          <FlatList
            data={camera_history}
            renderItem={({item}) => (
              <ScreenListItem
                item={item}
                setImageViewerImage={setImageViewerImage}
                toggleImageViewer={toggleImageViewer}
              />
            )}
            keyExtractor={item => item._id}
            removeClippedSubviews={true}
          />
        </ExpandableSection>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 10,
          position: 'absolute',
          bottom: 0,
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
          disabled={!socket_state || incoming_screenshot.data.active}
          onPress={async () => {
            const newScreenShotOrder = await createNewOrder('INSTANT_SCREEN');
            if (is_pc_live) {
              await emitOrder(
                socket_state,
                'INSTANT_SCREEN',
                newScreenShotOrder.new_order._id,
                'Mobile',
              );
              setIncomingScreenshot(newScreenShotOrder.new_order, '');
            } else {
              showNewError(
                'Order Registered and it will be executed when your pc is become live. We Will Send you a Notification',
              );
            }
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
          }}
          disabled={!socket_state || incoming_camera.data.active}
          onPress={async () => {
            const newCameraOrder = await createNewOrder('EYE_ON_THE_SKY');
            if (is_pc_live) {
              await emitOrder(
                socket_state,
                'EYE_ON_THE_SKY',
                newCameraOrder.new_order._id,
                'Mobile',
              );
              setIncomingCamera(newCameraOrder.new_order, '');
            } else {
              showNewError(
                'Order Registered and it will be executed when your pc is become live. We Will Send you a Notification',
              );
            }
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
    </View>
  );
}
const mapStateToProps = state => ({
  socket_state: state.Socket.socket,
  is_pc_live: state.PC.is_connected,
  screenshot_history: state.ScreenAndCamera.screenshot_history,
  camera_history: state.ScreenAndCamera.camera_history,
  incoming_screenshot: state.ScreenAndCamera.incoming_screenshot,
  incoming_camera: state.ScreenAndCamera.incoming_camera_shot,
  is_model_open: state.ScreenAndCamera.is_model_open,
  current_model_photo: state.ScreenAndCamera.model_current_photo,
});

export default connect(mapStateToProps, {
  getScreenshotHistory,
  getCameraHistory,
  setIncomingScreenshot,
  setImageViewerImage,
  toggleImageViewer,
  setIncomingCamera,
})(ScreenAndCameraScreen);
