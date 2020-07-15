import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import {
  reset_order_status,
  update_status,
  get_ransom_lock_state,
} from "../../../redux/actions/control";
get_ransom_history;
import { useFocusEffect } from "@react-navigation/native";
import { get_ransom_history, create_new_order } from "../../../redux/actions/orders";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const NLockerScreen = ({
  navigation,
  auth,
  status,
  ransom_lock_state,
  get_ransom_lock_state,
  reset_order_status,
  update_status,
  ransom_lock_history,
  get_ransom_history,
  create_new_order
}) => {
  const [loading, setloading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key)
        .then(() => get_ransom_lock_state(auth.key))
        .then(() => get_ransom_history(auth.key).then(() => setloading(false)));
      return () => {
        setDisabled(false);
        setloading(true)
        reset_order_status();
      };
    }, [])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.container}>
            <View>
              <ScrollView>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}
                >
                  What is Emergency Locker Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Emergency Locker is a tool that manage you to Lock Your PC
                  with a Complex Password, And Can not be Unlocked or using PC
                  Even if PC restarted.
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  Why May I need it?
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 3 }}>
                  - If You think your PC password is Compromised, Emergency
                  Locker doesn't depend on Windows Password. Its Standalone
                  Locker. With Auto Complex Generated Password For You.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - If anyone tried to enter wrong password you will Receive a
                  Notification with a photo of him using your webcam(If
                  Detected).
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  How To Use It?
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Click Send Emergency Locker Request
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Your PC Will Be Locked. And Unlock Your PC Button Will be
                  Enabled to see the complex Password
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - You Will Receive a Notification When Someone Enter Wrong
                  Password with a photo of him.
                </Text>
              </ScrollView>
            </View>
          </View>
          <Status status={status} />
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "column",
              padding: 10,
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderColor: "#d1d1d1",
            }}
          >
            <Text
              style={{ fontSize: 10, textAlign: "center", paddingBottom: 10 }}
            >
              Average Response Time For Emergency Locker Request is 1S
            </Text>

            {/* or lock is active */}
            {!status.active && ransom_lock_state == 0 ? (
              <Button
                title="  Send Emergency Locker Request"
                disabled={disabled}
                icon={<Ionicons name="ios-nuclear" size={24} color="yellow" />}
                buttonStyle={{ backgroundColor: "#a83266" }}
                onPress={() => {
                  create_new_order(auth.key, "RANSOM_LOCK").then(() => {
                    update_status(auth.key).then(() => get_ransom_lock_state(auth.key));
                  });

                }}
              />
            ) : null}
            <View>
              <Button
                icon={<AntDesign name="warning" size={24} color="white" />}
                buttonStyle={{ backgroundColor: "orange", marginVertical: 10 }}
                title="  Invalid Unlock Tries"
                disabled={ransom_lock_history == 0 ? true : false}
                onPress={() => navigation.navigate("InvalidUnlock")}
              />
              <Button
                title="  Unlock Your PC"
                disabled={ransom_lock_state.locked ? false : true}
                icon={<Ionicons name="ios-unlock" size={24} color="white" />}
                onPress={() => navigation.navigate("UNLOCK_RANSOM")}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.control.status,
  ransom_lock_state: state.control.ransom_lock_state,
  ransom_lock_history: state.order.ransom_history,
});
export default connect(mapStateToProps, {
  reset_order_status,
  update_status,
  get_ransom_lock_state,
  get_ransom_history,
  create_new_order
})(NLockerScreen);
