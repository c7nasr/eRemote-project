import React from "react";
import { View, Text } from "react-native";
import { ListItem, Badge } from "react-native-elements";
import { connect } from "react-redux";

const Status = ({ status }) => {
  return (
    <View
      style={{
        // height: w,
        backgroundColor: "#fff",
      }}
    >
      <ListItem
        leftIcon={<Badge status={status.active ? "warning" : "success"} />}
      >
        <ListItem.Content>
          <ListItem.Title>
            {status.active ? (
              <Text>Cannot Make Request</Text>
            ) : (
              <Text>Ready To Make Request</Text>
            )}
          </ListItem.Title>
          <ListItem.Subtitle>
            {status.request_from == 0 ? (
              <Text>You Have Never Make a Request</Text>
            ) : (
              <Text>Last request was {status.request_from}</Text>
            )}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem
        leftIcon={<Badge status={status.active ? "warning" : "success"} />}
      >
        <ListItem.Content>
          <ListItem.Title>
            {status.last == null ? (
              <Text>You Have Never Make a Request</Text>
            ) : (
              <Text>Last Request was {status.last}</Text>
            )}
          </ListItem.Title>
          <ListItem.Subtitle>
            {status.active ? (
              <Text>Last Request is still in progress</Text>
            ) : (
              <Text>Last Request is done</Text>
            )}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default Status;
