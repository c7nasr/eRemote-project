import React, { useState } from "react";
import { View, ActivityIndicator, ToastAndroid } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const ListViewPast = ({ type, media, date }) => {
  const [Downloading, setDownloading] = useState(false);
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    const p = { downloadProgress: progress };
    // if ((p.downloadProgress.toFixed(2) * 100) != 100) {

    // }
  };
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
                ToastAndroid.show(
                  "Downloading....",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
                const { uri } = await FileSystem.createDownloadResumable(
                  l,
                  FileSystem.documentDirectory +
                    "nc_" +
                    l.split(".")[5] +
                    "." +
                    l.split(".")[6],
                  {},
                  callback
                ).downloadAsync();
                ToastAndroid.show(
                  "Download Complete",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
                setDownloading(false);
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
