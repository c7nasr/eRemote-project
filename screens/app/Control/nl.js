import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Status from "../../../components/control/Status";
import { ScrollView } from "react-native-gesture-handler";

const NLockerScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <ScrollView>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 3 }}>
            What is Emergency Locker Tool?
          </Text>
          <Text style={{ fontSize: 16 }}>
            Emergency Locker is a tool that manage you to Lock Your PC with a
            Complex Password, And Can not be Unlocked or using PC Even if PC
            restarted.
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              paddingBottom: 3,
              paddingTop: 15,
            }}
          >
            Why May I need it?
          </Text>
          <Text style={{ fontSize: 16 , paddingBottom:3}}>
            - If You think your PC password is Compromised, Emergency Locker
            doesn't depend on Windows Password. Its Standalone Locker. With Auto
            Complex Generated Password For You.
          </Text>
          <Text style={{ fontSize: 16 }}>
            - If anyone tried to enter wrong password you will Receive a Notification with a photo of him using your webcam(If Detected).
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
            - Click Send Emergency Locker Request
          </Text>
          <Text style={{ fontSize: 16, paddingBottom: 2 }}>
            - Your PC Will Be Locked. And Unlock Your PC Button Will be Enabled to see the complex Password
          </Text>
          <Text style={{ fontSize: 16 }}>
            - You Will Receive Notification When Someone Enter Wrong Password.
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
        <Text style={{ fontSize: 10, textAlign: "center" }}>
          Average Response Time For Emergency Locker Request is 1S
        </Text>
        <Button title="Send Emergency Locker Request" />

        <Button title="Unlock Your PC" disabled={true} />
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

export default NLockerScreen;
