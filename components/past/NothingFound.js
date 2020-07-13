import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "react-native-elements";

export default function NothingFound({ type }) {
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/nothing.png")}
        style={{
          width: 400,
          height: 400,
          justifyContent: "center",
          borderRadius: 10,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={{ paddingTop: 10 }}>
        Hmm, Nothing Found. Please Make{" "}
        <Text style={{ fontWeight: "bold", fontSize:18 }}>{type} Request</Text> First.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 70,
  },
});
