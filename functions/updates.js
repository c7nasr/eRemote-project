import * as Updates from "expo-updates";

const check_for_updates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.log(e);
  }
};

export default check_for_updates;
