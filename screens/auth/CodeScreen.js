import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import {
  check_if_matched,
  Get_new_key,
} from "../../redux/actions/auth";

const CodeScreen = ({
  auth,
  Get_new_key,
  check_if_matched,
}) => {
  useEffect(() => {
    Get_new_key();
  }, []);

  return (
    
    <View style={style.container}>
      {!auth.key ? <ActivityIndicator/> : 
      <View>
      <Image style={style.logo} source={require("../../assets/logo.png")} />
      <View style={style.welcome_container}>
        <Text style={style.text_welcome}>
          Welcome, Enter This Code in Desktop App
        </Text>
      </View>
      <View style={style.code_container}>
        <Text style={style.code_}>{auth.key}</Text>
      </View>
      <View style={style.instruction_container}>
        <Text style={style.instruction_text}>How To Authenticate?</Text>
        <Text style={style.instruction_text}>
          - Open Desktop App and Enter the Code
        </Text>
        <Text style={style.instruction_text}>
          - After Enter Code Press Connect (On Desktop App)
        </Text>
        <Text style={style.instruction_text}>
          - Then Click I Entered Code Button
        </Text>
        <Button
          title="I Entered Code On My PC"
          onPress={() => check_if_matched(auth.key)}
          type="clear"
        />
         <Text style={{ fontSize: 10, textAlign: "center" }}>
            Made With <AntDesign name="heart" size={10} color="#d61111" /> By
            NASR
          </Text>
      </View>
      </View>
      }
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
    marginBottom: 10,
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
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  check_if_matched,
  Get_new_key
})(CodeScreen);
