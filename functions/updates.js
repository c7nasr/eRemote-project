import * as Updates from "expo-updates";
import { Alert } from "react-native";

const check_for_updates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Alert.alert("A new update is available, app will be restarted");
      await Updates.reloadAsync();
    }
  } catch (e) {
    Alert.alert("Error occurred checking for app updates");
    console.log(e);
  }
};

export default check_for_updates;
