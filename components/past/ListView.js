import React from "react";
import { View, Text } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import NothingFound from "./NothingFound";
export default function ListViewPast({ type, data }) {
  return (
    <View>
      {data.length !== 0 ? (
        <ListItem
          leftAvatar={
            type == "Records" ? (
              <FontAwesome name="file-audio-o" size={24} color="green" />
            ) : (
              {
                source: {
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/ncontrol-8288b.appspot.com/o/4C4Hqe84dv.png?alt=media&token=d6e1862f-718a-4049-b45f-82e13dc37c5e",
                },
              }
            )
          }
          title={type}
          subtitle="8 June 2020 at 3:00AM"
          bottomDivider
          rightElement={<Badge status="success" />}
          onPress={() => console.log(type)}
        />
      ) : (
        <NothingFound type={type}/>
      )}
    </View>
  );
}
