import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Grid from "react-native-grid-component";
import Control_Item from "../../components/app/ControlItem";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
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
    headerRight: () => (
      <AntDesign
        name="questioncircle"
        style={{ padding: 10 }}
        size={24}
        color="black"
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
        <View
          style={{
            backgroundColor: "#f1f1f1",
            height: 160,
            borderTopWidth: 1,
            borderTopColor: "#d5d5d5",
          }}
        >
          <ScrollView>
            <View>
              <ListItem
                title="Windows"
                subtitle="Microsoft Windows 10 Pro"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={
                  <AntDesign name="windows" size={24} color="#0078D7" />
                }
              />
               <ListItem
                title="nxxx-xxx-xxx"
                subtitle="41.35.89.163"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<AntDesign name="key" size={24} color="black" />}
              />
              <ListItem
                title="NASR"
                subtitle="93047521961034"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<AntDesign name="user" size={24} color="#8332a8" />}
              />
              <ListItem
                title="Camera Detected"
                subtitle="If it dosn't make sense. Click Faq Button"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<Entypo name="camera" size={24} color="#08cf04" />}
              />
              <ListItem
                title="Microphone NOT Detected"
                subtitle="If it doesn't make sense. Click Faq Button"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<FontAwesome name="microphone" size={24} color="red" />}
              />
                 <ListItem
                title="Battery Detected"
                subtitle="58% - Last Charge at 5:40PM"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<Entypo name="battery" size={24} color="#444" />}
              />
            </View>
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
