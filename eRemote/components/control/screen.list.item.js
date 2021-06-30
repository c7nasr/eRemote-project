import React from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Text, ListItem, Card} from 'react-native-ui-lib';
import ImageOverlay from 'react-native-image-overlay';
import {convertToAgo} from '../../lib/time.lib';

const ScreenListItem = ({item, setImageViewerImage, toggleImageViewer}) => {
  return (
    <View style={{marginBottom: 10}}>
      {!item.media || !item.base_url ? (
        <TouchableOpacity
          onPress={() => {
            if (item.media) {
              setImageViewerImage(item.media);
            } else if (item.base_url) {
              setImageViewerImage(item.base_url);
            }

            toggleImageViewer(true);
          }}>
          <ImageOverlay
            height={250}
            source={{uri: item.media || item.base_url}}
            contentPosition="center">
            <View>
              <Text grey80>
                {convertToAgo(item.updatedAt || item.data.updatedAt)}
              </Text>
              <Text grey80>
                Requested From {item.source || item.data.source} application
              </Text>
              <Text grey80 center>
                Click to see full image
              </Text>
            </View>
          </ImageOverlay>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ScreenListItem;
