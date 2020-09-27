import React from "react";
import { View, Text } from "react-native";
import { ListItem, Badge } from "react-native-elements";
import { connect } from "react-redux";

 const  Status = ({status}) => {

  return (
    <View
      style={{
        // height: w,
        backgroundColor: "#fff",
      }}
    >
      <ListItem
        title={status.active ? "Cannot Make Request" : "Ready To Make Request"}
        subtitle={status.request_from == 0 ? "You Have Never Make a Request" : "Last request was "+ status.request_from}
        rightIcon={<Badge status={status.active? "warning" : "success"} />}
      />

      <ListItem
        title={status.last == null ? "You Have Never Make a Request" :"Last Request was "+ status.last}
        subtitle={status.active ? "Last Request is still in progress" : "Last Request is done"}
        rightIcon={<Badge status={status.active? "warning" : "success"} />}
      />
    </View>
  );
}

export default Status;