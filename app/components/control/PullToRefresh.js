import React from "react";
import { View, Text } from "react-native";

export default function PullToRefresh() {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          paddingTop: 10,
          fontSize: 10,
          fontWeight: "100",
          color: "#ddd",
        }}
      >
        Pull to Refresh
      </Text>
    </View>
  );
}
