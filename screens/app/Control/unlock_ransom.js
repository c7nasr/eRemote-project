import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { Image } from "react-native-elements";

const unlock_ransom = ({ ransom_lock_state, navigation }) => {
  useEffect(() => {
    async function check() {
      const is_finger = LocalAuthentication.hasHardwareAsync();
      if (!is_finger) setLoading(false);
      const status = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: false,
        fallbackLabel: "Scan Your Finger Print to Authenticate",
      });
      if (status.success) {
        setLoading(false);
      } else {
        console.log(status);
        navigation.popToTop();
      }
    }
    check();
  }, []);
  const [Loading, setLoading] = useState(true);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {Loading ? (
        <View>
          <ActivityIndicator size="large" />
          <Text>Waiting For Verify</Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal:10 }}>
          <Image
            source={require("../../../assets/rn.png")}
            style={{ width: 150, height: 150 }}
         />
         <Text style={{textAlign: "center",fontSize:16, paddingVertical:20}}>Welcome, This is Your Private Password to Unlock Your PC.</Text>
         <Text style={{textAlign: "center",fontSize:36, color:"indigo" , paddingBottom:20}}>{ransom_lock_state.unlock_code}</Text>
         <Text style={{textAlign: "center",fontSize:16}}>This is One-tme Password. That Expire after using.</Text>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  ransom_lock_state: state.control.ransom_lock_state,
});
export default connect(mapStateToProps)(unlock_ransom);
