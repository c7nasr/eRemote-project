import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import Status from "../../../components/control/Status";

const LockScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}>
            What is Windows Lock Tool?
          </Text>
          <Text style={{ fontSize: 16 }}>
            Windows Lock is a tool that manage you to lock your pc with windows
            password
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
          <Text style={{ fontSize: 16}}>
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
          <Text style={{ fontSize: 16 }}>
            {/* You have never requested screenshot. */}
            Last Lock you requested was in{" "}
            <Text style={{ fontWeight: "bold" }}>8 June at 8:01PM.</Text>
          </Text>
        </View>
      </View>
      <Status w={270} />
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
        <Button block danger>
        
          <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
            Send Windows Lock Request
          </Text>
        </Button>
      </View>
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

export default LockScreen;
