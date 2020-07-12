import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const CodeScreen = () => {
  return (
    <View style={style.container}>
      <Image style={style.logo} source={require("../../assets/logo.png")} />
      <View style={style.welcome_container}>
        <Text style={style.text_welcome}>
          Welcome, Enter This Code in Desktop App
        </Text>
      </View>
      <View style={style.code_container}>
        <Text style={style.code_}>n421-4241-1565</Text>
      </View>
      <View style={style.instruction_container}>
        <Text style={style.instruction_text}>
          If You Don't Have Desktop App. Please Go To: ncontrol.io/desktop
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  code_container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  code_: {
    marginLeft: 10,
    fontSize: 34,
    color: "#b83b5e",
  },
  welcome_container: {
    justifyContent: "center",
  },
  text_welcome: {
    fontSize: 16,
    alignSelf: "center",
  },

  instruction_container: {
    marginBottom: 10,
  },
  instruction_text: {
    fontSize: 12,
    textAlign: "center",
    color: "#3b6978",
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default CodeScreen;
