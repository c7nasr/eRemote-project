import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
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
    const permission = await MediaLibrary.requestPermissionsAsync();
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

      const { uri } = await FileSystem.createDownloadResumable(
        l,
        FileSystem.documentDirectory +
          "/eRemote/" +
          "nc_" +
          l.split(".")[5] +
          "." +
          l.split(".")[6],
        {},
        callback
      ).downloadAsync();

      MediaLibrary.createAssetAsync(
        FileSystem.documentDirectory +
          "/eRemote/" +
          "nc_" +
          l.split(".")[5] +
          "." +
          l.split(".")[6]
      );
      ToastAndroid.showWithGravity(
        "Download Complete " + uri,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    console.log("Finished downloading to ", uri);
  } catch (e) {
    console.error(e);
  }
};

export default downloadMedia;
