import * as FileSystem from "expo-file-system";
import { ToastAndroid } from "react-native";
import * as Permissions from "expo-permissions"
import * as MediaLibrary from 'expo-media-library';

const callback = (downloadProgress) => {
  const progress =
    downloadProgress.totalBytesWritten /
    downloadProgress.totalBytesExpectedToWrite;
  const p = { downloadProgress: progress };
  // if ((p.downloadProgress.toFixed(2) * 100) != 100) {

  // }
};
const downloadMedia = async (m) => {
  try {
    media = m;
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (!permission.granted) {
      console.log("El PERMISSION ya KSMK");
      return;
    } else {
      ToastAndroid.showWithGravity(
        "Downloading....",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      const is_existed = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "/eRemote"
      );
      if (!is_existed.exists) {
        FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "/eRemote"
        );
      }
      const { uri } = await FileSystem.createDownloadResumable(m,FileSystem.documentDirectory +"/eRemote/" +"ec_" +
          m.split(".")[5] +
          "." +
          m.split(".")[6],
        {},
        callback
      ).downloadAsync();
      ToastAndroid.showWithGravity(
        "Download Complete " ,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    const asset = await MediaLibrary.createAssetAsync(uri)
    await MediaLibrary.createAlbumAsync("eRemote", asset, false)
    }

  } catch (e) {
    console.error(e);
  }
};

export default downloadMedia;
