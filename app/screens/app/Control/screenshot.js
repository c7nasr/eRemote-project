import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  reset_order_status,
  update_status,
  reset_params_past,
  get_one_past,
} from "../../../redux/actions/control";
import { useFocusEffect } from "@react-navigation/native";
import { create_new_order } from "../../../redux/actions/orders";
import { Button } from "react-native-elements";
import { SimpleLineIcons, Entypo } from "@expo/vector-icons";
import Shimmer from "../../../components/app/ShimmerMainScreens";
const ScreenshotScreen = ({
  navigation,
  auth,
  status,
  past,
  reset_params_past,
  reset_order_status,
  update_status,
  get_one_past,
  past_r,

  create_new_order,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setloading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() =>
        get_one_past(auth.key, "screenshot").then(() => setloading(false))
      );
      return () => {
        setDisabled(false);
        reset_order_status().then(() => reset_params_past());
      };
    }, [])
  );
  return (
    <>
      {loading ? (
        <Shimmer/>
      ) : (
        <>
          <View style={styles.container}>
            <View>
              <ScrollView>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}
                >
                  What is Screenshot Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Screenshot is a tool that manage you to take a screenshot of
                  your current pc screen?
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
                  - Click on Send Screenshot Request Button.
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Your PC Will Take Screenshot and Upload It.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - You Will Receive Notification When Upload Complete.
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  Last Screenshot?
                </Text>
                {!past_r ? (
                  <Text style={{ fontSize: 16 }}>
                    You Have never requested a Screenshot
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    Last screenshot you requested was{" "}
                    <Text style={{ fontWeight: "bold" }}>{past_r}</Text>
                  </Text>
                )}
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
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Average Response Time For Screenshot Request is 1.3S
            </Text>
            {!status.active ? (
              <Button
                disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  create_new_order(auth.key, "INSTANT_SCREEN").then(() => {
                    update_status(auth.key);
                  });
                }}
                title="  Send Screenshot Request"
                icon={
                  <SimpleLineIcons
                    name="screen-desktop"
                    size={24}
                    color="white"
                  />
                }
                buttonStyle={{ backgroundColor: "#069e2f", marginVertical:10 }}
              />
            ) : null}
            <Button
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Screenshot" })
              }
              icon={<Entypo name="back" size={24} color="white" />}
              disabled={!past_r ? true : false}
              title="  Past Screenshots"
            />
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
  past: state.control.past,
  past_r: state.control.past_r,
});
export default connect(mapStateToProps, {
  get_one_past,
  reset_order_status,
  update_status,
  reset_params_past,
  create_new_order,
})(ScreenshotScreen);
