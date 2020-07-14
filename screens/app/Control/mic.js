import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "native-base";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";
import {
  reset_order_status,
  update_status,
  get_one_past
} from "../../../redux/actions/control";

import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";

const MicrophoneScreen = ({
  navigation,
  update_status,
  reset_order_status,
  status,
  auth,
  past,
  past_r,
get_one_past

}) => {
  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() =>
      get_one_past(auth.key, "microphone").then(() => setloading(false))
      );
      return () => {
        console.log("BACKED");
        reset_order_status();
      };
    }, [])
  );
  const [loading, setloading] = useState(true)
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
                {!past_r ? 
                  <Text style={{ fontSize: 16 }}>
                    You Have never requested a Audio Record
                  </Text>
                 : 
                  <Text style={{ fontSize: 16 }}>
                    Last Record you requested was in{" "}
                    <Text style={{ fontWeight: "bold" }}>{past_r}</Text>
                  </Text>
                }
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
              Average Response Time For Record Audio Request is 1.25M
            </Text>
            {!status.active ? 
              <Button block danger>
                <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                  Send Record Request
                </Text>
              </Button>
             : null}
            <Button
              block
              info
              onPress={() =>
                navigation.navigate("PastRequests", { type: "Records" })
              }
              disabled={!past_r ? true : false}
            >
              <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                Past Records
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
  past_r: state.control.past_r

});
export default connect(mapStateToProps, {
  get_one_past,
  reset_order_status,
  update_status,
})(MicrophoneScreen);
