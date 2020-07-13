import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

import Status from "../../../components/control/Status";

const PowerOptionsScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <ScrollView>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}>
            What is Power Options Tool?
          </Text>
          <Text style={{ fontSize: 16 }}>
          Power Options Tool is a tool that manage you to Restart or Shutdown Your PC
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
          <Text style={{ fontSize: 16, paddingBottom:2 }}>
            - Click on Send Shutdown or Restart Request Button.
          </Text>
          <Text style={{ fontSize: 16, paddingBottom:2  }}>
            - Your PC Will Response to Request Immediately.
          </Text>
          <Text style={{ fontSize: 16 }}>
            - Be Careful. In case of Shutting Down You Won't Be able use app until pc is reopen.
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
          <Text style={{ fontSize: 16 }}>
            Last Power Request you requested was in{" "}
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
          Average Response Time For Power Request is 0.5S
        </Text>
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


export default PowerOptionsScreen;
