import React from 'react'
import { View } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";

import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

import { ListItem } from "react-native-elements";

export default function InfoScreen() {
    return (
        <View>
           <ScrollView >
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
                subtitle="If it doesn't make sense. Click Faq Button"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={<Entypo name="camera" size={24} color="#08cf04" />}
              />
              <ListItem
                title="Microphone NOT Detected"
                subtitle="If it doesn't make sense. Click Faq Button"
                containerStyle={{ backgroundColor: "#f1f1f1" }}
                leftAvatar={
                  <FontAwesome name="microphone" size={24} color="red" />
                }
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
    )
}
