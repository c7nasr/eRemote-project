import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  get_one_past,
  reset_order_status,
  update_status,
  reset_params_past,
} from "../../../redux/actions/control";
import { useFocusEffect } from "@react-navigation/native";
import { create_new_order } from "../../../redux/actions/orders";
import { Feather, Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements";
const CameraScreen = ({
  navigation,
  update_status,
  past_r,
  reset_order_status,
  reset_params_past,
  status,
  auth,
  past,
  get_one_past,
  create_new_order,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      get_one_past(auth.key, "camera").then(() =>
        update_status(auth.key).then(() => setloading(false))
      );

      return () => {
        setDisabled(false);
        reset_order_status().then(() => reset_params_past());
      };
    }, [])
  );
  const [loading, setloading] = useState(true);
  const [disabled, setDisabled] = useState(false);
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
                  What is Photo Camera Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Photo Camera is a tool that manage you to open webcam of your
                  pc and take a photo, Then Upload it.
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
                  - Click on Send Camera Request Button.
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Your PC Will Open Camera, take photo, and Upload It.
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
                  Last Camera Request?
                </Text>
                {!past_r ? (
                  <Text style={{ fontSize: 16 }}>
                    You Have never requested a Camera Photo
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    Last Photo you requested was in{" "}
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
              Average Response Time For Camera Tool Request is 5S
            </Text>
            {!status.active ? (
              <Button
                disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  create_new_order(auth.key, "EYE_ON_THE_SKY").then(() => {
                    update_status(auth.key);
                  });
                }}
                title=" Send Camera Request"
                icon={<Feather name="camera" size={24} color="white" />}
                buttonStyle={{ backgroundColor: "#069e2f", marginVertical: 10 }}
              />
            ) : null}
            <Button
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Photos" })
              }
              icon={<Entypo name="back" size={24} color="white" />}
              disabled={past == "notfound" ? true : false}
              title="  Past Photos"
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
  reset_params_past,
  create_new_order,
})(CameraScreen);
