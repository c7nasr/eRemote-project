import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";
import {
  reset_order_status,
  update_status,
  get_one_past,
} from "../../../redux/actions/control";
import { Button } from "react-native-elements";

import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { create_new_order } from "../../../redux/actions/orders";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Shimmer from "../../../components/app/ShimmerMainScreens";

const MicrophoneScreen = ({
  navigation,
  update_status,
  reset_order_status,
  status,
  auth,
  past_r,
  get_one_past,
  create_new_order,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() =>
        get_one_past(auth.key, "microphone").then(() => setloading(false))
      );
      return () => {
        setDisabled(false);
        reset_order_status();
      };
    }, [])
  );
  const [disabled, setDisabled] = useState(false);

  const [loading, setloading] = useState(true);
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
                  What is Record Audio Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Record Audio is a tool that manage you to open microphone of
                  your pc and Record 1 minute.
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
                  - Click on Send Record Request Button.
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Your PC Will Start Recording for one minute and Upload It.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - You Will Receive Notification When Record Complete.
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  Last Record?
                </Text>
                {!past_r ? (
                  <Text style={{ fontSize: 16 }}>
                    You Have never requested a Audio Record
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    Last Record you requested was in{" "}
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
              Average Response Time For Record Audio Request is 1.25M
            </Text>
            {!status.active ? (
              <Button
                disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  create_new_order(auth.key, "EAR_ON_THE_SKY").then(() => {
                    update_status(auth.key);
                  });
                }}
                title="  Send Record Request"
                icon={<FontAwesome name="microphone" size={24} color="white" />}
                buttonStyle={{ backgroundColor: "#069e2f", marginVertical:10 }}
              />
            ) : null}
            <Button
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Records" })
              }
              icon={<Entypo name="back" size={24} color="white" />}
              disabled={!past_r ? true : false}
              title="  Past Records"
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
  control: state.control,
  status: state.control.status,
  past: state.control.past,
  past_r: state.control.past_r,
});
export default connect(mapStateToProps, {
  get_one_past,
  reset_order_status,
  update_status,
  create_new_order,
})(MicrophoneScreen);
