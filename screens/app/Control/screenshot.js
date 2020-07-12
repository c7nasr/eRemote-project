import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import Status from "../../../components/control/Status";

const ScreenshotScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}>
            What is Screenshot Tool?
          </Text>
          <Text style={{ fontSize: 16 }}>
            Screenshot is a tool that manage you to take a screenshot of your
            current pc screen?
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
          <Text style={{ fontSize: 16 }}>
            {/* You have never requested screenshot. */}
            Last screenshot you requested was in{" "}
            <Text style={{ fontWeight: "bold" }}>8 June at 8:01PM.</Text> You
            can found it at Past Screenshots Button
          </Text>
        </View>
      </View>
      <Status w={230} />

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
        <Button block success>
          <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
            Send Screenshot Request
          </Text>
        </Button>
        <Button block info>
          <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
            Past Screenshots
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
export default ScreenshotScreen;