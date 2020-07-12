import React from "react";
import { View, Text } from "react-native";
import { ListItem, Badge } from "react-native-elements";

export default function Status() {
  return (
    <View
      style={{
        height: 300,
        backgroundColor: "#fff",
       
      }}
    >
      <ListItem
        title="Ready To Send Request"
        subtitle="Last Request Was 5 minutes ago"
        rightIcon={<Badge status="success" />}
      />

      <ListItem
        title="Last Request Status Took only 4S"
        subtitle="Last Request status is Success"
        rightIcon={<Badge status="success" />}
      />
    </View>
  );
}
