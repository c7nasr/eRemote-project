import React from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Grid from "react-native-grid-component";
import Control_Item from "../../components/app/ControlItem";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { get_phone_info } from "../../redux/actions/orders";
import create_channel from "../../functions/notifcations";

const ControlScreen = ({ navigation, auth, get_phone_info }) => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: "#f9f7f7",
      elevation: 1,
    },
    headerTintColor: "#112d4e",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
        <AntDesign
          name="questioncircle"
          style={{ padding: 15 }}
          size={24}
          color="#3250a8"
        />
      </TouchableOpacity>
    ),
  });

  create_channel(navigation);
  get_phone_info(auth.key);

  return (
    <>
      <View style={styles.container}>
        <Grid
          style={styles.list}
          renderItem={(d, i) => (
            <Control_Item data={d} index={i} key={i} nav={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          data={["ss", "lock", "camera", "mic", "nl", "po"]}
          numColumns={2}
        />
        <View>
          <Text style={{ fontSize: 8, textAlign: "center" }}>
            Your PC Identification Number: {auth.key}
          </Text>
          <Text style={{ fontSize: 8, textAlign: "center" }}>
            Made With <AntDesign name="heart" size={8} color="#d61111" /> By
            NASR
          </Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 5,
    marginBottom: 5,
    // backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { get_phone_info })(ControlScreen);
