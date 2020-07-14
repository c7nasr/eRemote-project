import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "native-base";
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
}) => {
  useFocusEffect(
    React.useCallback(() => {
      get_one_past(auth.key, "camera").then(() =>
        update_status(auth.key).then(() => setloading(false))
      );

      return () => {
        console.log("BACKED");
        reset_order_status().then(() => reset_params_past());
      };
    }, [])
  );
  const [loading, setloading] = useState(true);

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
              height: 140,
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
              <Button block danger>
                <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                  Send Camera Request
                </Text>
              </Button>
            ) : null}
            <Button
              block
              info
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Photos" })
              }
              disabled={past == "notfound" ? true : false}
            >
              <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                Past Photos
              </Text>
            </Button>
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
})(CameraScreen);
