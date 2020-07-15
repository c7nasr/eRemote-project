import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const unlock_ransom = ({ ransom_lock_state }) => {
  return (
    <View>
      <Text>{ransom_lock_state.unlock_code}</Text>
    </View>
  );
};
const mapStateToProps = (state) => ({
  ransom_lock_state: state.control.ransom_lock_state,
});
export default connect(mapStateToProps)(unlock_ransom);
