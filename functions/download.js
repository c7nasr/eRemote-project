import * as FileSystem from "expo-file-system";

const callback = (downloadProgress) => {
  const progress =
    downloadProgress.totalBytesWritten /
    downloadProgress.totalBytesExpectedToWrite;
  const p = { downloadProgress: progress };
  console.log(p.downloadProgress.toFixed(2) * 100);
};

const downloadMedia = async (m) => {
  try {
    media = m;
    console.log(m);
    const { uri } = await FileSystem.createDownloadResumable(
      m,
      FileSystem.documentDirectory + "small.wav",
      {},
      callback
    ).downloadAsync();
    console.log("Finished downloading to ", uri);
  } catch (e) {
    console.error(e);
  }
};

export default downloadMedia;
