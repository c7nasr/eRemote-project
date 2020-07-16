import React, { useState } from "react";
import { View, ActivityIndicator, ToastAndroid } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import downloadMedia from "../../functions/download";

const ListViewPast = ({ type, media, date }) => {
  const [Downloading, setDownloading] = useState(false);

  {
    return (
      <View>
        {media.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={
              type == "Records" ? (
                <FontAwesome name="file-audio-o" size={24} color="green" />
              ) : (
                {
                  source: {
                    uri: l,
                  },
                }
              )
            }
            title={type}
            subtitle={date[i]}
            bottomDivider
            rightElement={<Badge status="success" />}
            onPress={async () => {
              try {
                setDownloading(true);
                downloadMedia(l).then(() => {
                  setDownloading(false);
                });
              } catch (e) {
                console.error(e);
              }
            }}
          />
        ))}
        {Downloading ? (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{ flex: 1, justifyContent: "center" }}
          />
        ) : null}
      </View>
    );
  }
};

export default ListViewPast;
