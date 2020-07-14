import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import { set_download_rate } from "../../redux/actions/download";
import SnackBar from "react-native-snackbar-component";

const ListViewPast = ({ type, media, date, set_download_rate }) => {
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    const p = { downloadProgress: progress };
    if (p.downloadProgress.toFixed(2)*100 %20){

      set_download_rate(p.downloadProgress.toFixed(2) * 100);
    } 
   
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
                set_download_rate(0);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        ))}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  download: state.download,
});
export default connect(null, { set_download_rate })(ListViewPast);
