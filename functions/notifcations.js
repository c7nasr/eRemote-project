import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
const create_channel = async (navigation) => {
  try {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      const page = response.notification.request.content.data.page;
      const ransom = response.notification.request.content.data.ransom;
      if (!page == undefined){
        navigation.navigate("PastRequests",{ type: page })
      }else if(ransom){
        navigation.navigate("InvalidUnlock")
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export default create_channel;
