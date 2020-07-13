import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ListViewPast from "../../../components/past/ListView";
import { Text } from "react-native-elements";
import PullToRefresh from "../../../components/control/PullToRefresh";

export default function PastRequests({ route, navigation }) {
  const { type } = route.params;
  navigation.setOptions({
    headerStyle: {
      backgroundColor: "#f9f7f7",
      elevation: 1,
    },
    headerTitleAlign: "center",
    headerTitle: "Past " + type,
  });
  const data = [
    // {
    //   name: 'Amy Farha',
    //   avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //   subtitle: 'Vice President'
    // },
    // {
    //   name: 'Chris Jackson',
    //   avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //   subtitle: 'Vice Chairman'
    // },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <PullToRefresh/>
        <ListViewPast type={type} data={data} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
