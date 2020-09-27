import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import {
  reset_order_status,
  update_status,
  get_last_lock_request,
} from "../../../redux/actions/control";

import { useFocusEffect } from "@react-navigation/native";
import { create_new_order } from "../../../redux/actions/orders";
import { Button } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import Shimmer from "../../../components/app/ShimmerMainScreens";

const LockScreen = ({
  auth,
  status,
  control,
  reset_order_status,
  update_status,
  get_last_lock_request,
  last_lock,
  create_new_order,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() => get_last_lock_request(auth.key));
      return () => {
        setDisabled(false);
        reset_order_status();
      };
    }, [])
  );
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      {control.loading ? (
       <Shimmer/>
      ) : (
        <>
          <View style={styles.container}>
            <View>
              <ScrollView>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}
                >
                  What is Windows Lock Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Windows Lock is a tool that manage you to lock your pc with
                  windows password
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
                <Text style={{ fontSize: 16 }}>
                  - Click on Send Windows Lock Request Button.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - Your PC Will Response To Request And Lock it.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - You Will Receive Notification When Request Complete.
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  Last Lock?
                </Text>
                {last_lock.date ? (
                  <Text style={{ fontSize: 16 }}>
                    Last Lock you requested was in{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {last_lock.date}
                    </Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    You have never made a Lock Request
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
          <Status status={status} />
          <View
            style={{
              height: 95,
              justifyContent: "space-around",
              flexDirection: "column",
              padding: 10,
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderColor: "#d1d1d1",
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Average Response Time For Windows Lock Request is 0.9S
            </Text>
            {!status.active ? (
              <Button
                disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  create_new_order(auth.key, "INSTANT_LOCK").then(() => {
                    update_status(auth.key);
                  });
                }}
                title=" Send Windows Lock Request"
                icon={<AntDesign name="lock" size={24} color="white" />}
                buttonStyle={{ backgroundColor: "#069e2f" }}
              />
            ) : null}
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
  control: state.control,
  status: state.control.status,
  last_lock: state.control.last_lock,
});
export default connect(mapStateToProps, {
  reset_order_status,
  update_status,
  get_last_lock_request,
  create_new_order,
})(LockScreen);
