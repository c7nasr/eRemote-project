import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "native-base";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  get_past_requests,
  reset_order_status,
  update_status,
} from "../../../redux/actions/control";

import { useFocusEffect } from "@react-navigation/native";

const ScreenshotScreen = ({
  navigation,
  auth,
  status,
  control,
  past,

  reset_order_status,
  update_status,
  get_past_requests,
}) => {
  const [disabled, setDisabled] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() =>
        get_past_requests(auth.key, "screenshot", true)
      );
      return () => {
        console.log("BACKED");
        reset_order_status();
      };
    }, [])
  );
  return (
    <>
      {control.loading ? (
        <ActivityIndicator />
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
                {past == "notfound" ? (
                  <Text style={{ fontSize: 16 }}>
                    You Have never requested a Screenshot
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    Last screenshot you requested was{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {status.requested_at}
                    </Text>
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
          <Status status={status} w={230} />

          <View
            style={{
              height: 150,
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
              <Button block success disabled={disabled}>
                <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                  Send Screenshot Request
                </Text>
              </Button>
            ) : null}
            <Button
              block
              info
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Screenshot" })
              }
              disabled={past == "notfound" ? true : false}
            >
              <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                Past Screenshots
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
});
export default connect(mapStateToProps, {
  get_past_requests,
  reset_order_status,
  update_status,
})(ScreenshotScreen);
