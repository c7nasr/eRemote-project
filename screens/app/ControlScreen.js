import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Grid from "react-native-grid-component";
import Control_Item from "../../components/app/ControlItem";
import { ScrollView } from "react-native-gesture-handler";

const ControlScreen = ({ navigation }) => {
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
  });
  return (
    <>
      <View style={styles.container}>
        <Grid
          style={styles.list}
          renderItem={(d, i) => <Control_Item data={d} index={i} key={i} nav={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          data={["ss", "lock", "camera", "mic", "nl", "po"]}
          numColumns={2}
        />
        <View style={{ backgroundColor: "white", height: 150 }}>
            <ScrollView>
          <Text>Latest Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          <Text>PC Info</Text>
          </ScrollView>

        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 10,
    padding: 5,
    marginBottom: 5,
    // backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
export default ControlScreen;
