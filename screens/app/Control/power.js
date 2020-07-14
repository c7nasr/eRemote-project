import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

import Status from "../../../components/control/Status";
import { connect } from "react-redux";
import {
  get_past_requests,
  reset_order_status,
  update_status,
  get_last_power_request,
} from "../../../redux/actions/control";

import { useFocusEffect } from "@react-navigation/native";

const PowerOptionsScreen = ({
  auth,
  status,
  control,
  last_power,
  reset_order_status,
  update_status,
  get_last_power_request,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      update_status(auth.key).then(() => get_last_power_request(auth.key));
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
                  What is Power Options Tool?
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Power Options Tool is a tool that manage you to Restart or
                  Shutdown Your PC
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
                  - Click on Send Shutdown or Restart Request Button.
                </Text>
                <Text style={{ fontSize: 16, paddingBottom: 2 }}>
                  - Your PC Will Response to Request Immediately.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  - Be Careful. In case of Shutting Down You Won't Be able use
                  app until pc is reopen.
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingBottom: 3,
                    paddingTop: 15,
                  }}
                >
                  Last Power Request?
                </Text>
                {last_power.date ? (
                  <Text style={{ fontSize: 16 }}>
                    Last Power Request you requested was in{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {last_power.date}
                    </Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    You have never made a Power Request
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
              Average Response Time For Power Request is 0.5S
            </Text>
            {!status.active ? (
              <>
                <Button block danger>
                  <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                    Send Shutdown Request
                  </Text>
                </Button>
                <Button block info>
                  <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
                    Send Restart Request
                  </Text>
                </Button>
              </>
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
  last_power: state.control.last_power,
});
export default connect(mapStateToProps, {
  get_past_requests,
  reset_order_status,
  update_status,
  get_last_power_request,
})(PowerOptionsScreen);
