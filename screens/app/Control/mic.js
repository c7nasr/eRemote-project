import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";

const MicrophoneScreen = () => {
  return (
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
              Record Audio is a tool that manage you to open microphone of your
              pc and Record 1 minute.
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
            <Text style={{ fontSize: 16 }}>
              Last Record you requested was in{" "}
              <Text style={{ fontWeight: "bold" }}>8 June at 8:01PM.</Text>
            </Text>
          </ScrollView>
        </View>
      </View>
      <Status w={210} />
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
          Average Response Time For Windows Lock Request is 1.25M
        </Text>
        <Button block danger>
          <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
            Send Record Request
          </Text>
        </Button>
        <Button block info>
          <Text style={{ padding: 10, color: "white", fontSize: 18 }}>
            Past Records
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

export default MicrophoneScreen;
