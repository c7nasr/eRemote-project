import React, { useState } from "react";
import { View } from "react-native";
import ListViewPast from "../../../components/past/ListView";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { get_ransom_history } from "../../../redux/actions/orders";
const ransom_unlock_tries = ({
  ransom_lock_history,
  auth,
  get_ransom_history,
}) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        padding: 5,
      }}
    >
      {!ransom_lock_history ? (
        get_ransom_history(auth.key)
      ) : (
        <ScrollView>
          <ListViewPast
            type="Unlock Try"
            media={ransom_lock_history.photo}
            date={ransom_lock_history.try_dates}
          />
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.control.status,
  ransom_lock_state: state.control.ransom_lock_state,
  ransom_lock_history: state.order.ransom_history,
});
export default connect(mapStateToProps, { get_ransom_history })(
  ransom_unlock_tries
);
