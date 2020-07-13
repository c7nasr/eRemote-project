import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import Grid from "react-native-grid-component";
import Control_Item from "../../components/app/ControlItem";
import { AntDesign } from "@expo/vector-icons";
import {  Button } from "react-native-elements";
import { connect } from "react-redux";
const ControlScreen = ({ navigation ,auth}) => {
  
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
      <AntDesign
        name="questioncircle"
        style={{ padding: 10 }}
        size={24}
        color="black"
      />
    ),
    headerLeft: () => (
      <AntDesign
        name="questioncircle"
        style={{ padding: 10 }}
        size={24}
        color="black"
        onPress={async () => {
          await AsyncStorage.clear();
        }}
      />
    ),
  });
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
          <Button title={auth.key}/>
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
const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(ControlScreen);
