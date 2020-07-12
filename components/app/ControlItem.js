import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const Control_Item = ({ data , nav }) => {
  const images = {
    ss: require("../../assets/ss.png"),
    lock: require("../../assets/lock.png"),
    camera: require("../../assets/camera.png"),
    mic: require("../../assets/mic.png"),
    nl: require("../../assets/NLocker.png"),
    po: require("../../assets/po.png"),
  };
  const names = {
    ss: "Take Screenshot",
    lock: "Windows Lock",
    camera: "Take A Photo From Camera",
    mic: "Record Audio",
    nl: "Emergency Locker",
    po: "Power Options",
  };
  const colors = {
    ss: "#176c13",
    lock: "#ffc107",
    camera: "#9d66d5",
    mic: "#53b4f6",
    nl: "#b83b5e",
    po: "#04547c",
  };
  const routes ={
    ss: "Screenshot",
    lock: "Lock",
    camera: "Camera",
    mic: "Microphone",
    nl: "NLocker",
    po: "PowerOptions",
  }
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => nav.navigate(routes[data])}>
        <Image style={styles.logo} source={images[data]} />
        <Text style={[styles.title, { color: colors[data] }]}>
          {names[data]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    elevation: 1,
    padding: 10,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
  },
});

export default Control_Item;
