import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import ListViewPast from "../../../components/past/ListView";
import PullToRefresh from "../../../components/control/PullToRefresh";
import { connect } from "react-redux";
import { get_past_requests } from "../../../redux/actions/control";
import SnackBar from "react-native-snackbar-component";

import { Text } from "react-native-elements";

const PastRequests = ({
  route,
  navigation,
  past,
  get_past_requests,
  auth,
  download,
}) => {
  const { type } = route.params;
  navigation.setOptions({
    headerStyle: {
      backgroundColor: "#f9f7f7",
      elevation: 1,
    },
    headerTitleAlign: "center",
    headerTitle: "Past " + type,
  });
  console.log(type);

  let pasts;
  if (type == "Photos") {
    pasts = "camera";
  } else if (type == "Records") {
    pasts = "microphone";
  } else if (type == "Screenshot") {
    pasts = "screenshot";
  }
  useEffect(() => {
    get_past_requests(auth.key, pasts, false).then(() => setloading(false));
  }, []);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSnake, setshowSnake] = useState(false);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                get_past_requests(auth.key, pasts, false).then(() => {
                  setloading(false);
                  setRefreshing(false);
                });
              }}
            />
          }
        >
          <PullToRefresh />
          <ListViewPast type={type} media={past.media} date={past.dates} />
          <Text style={{ textAlign: "center", padding: 10 }}>
            Download Rate: {download.download_rate} %
          </Text>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
  past: state.control.past,
  download: state.download,
});
export default connect(mapStateToProps, {
  get_past_requests,
})(PastRequests);
