import React from 'react';
import {Toast} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {hideErrors} from '../redux/actions/Toast.Action';

const ToastMessage = ({message, dismissTime, color, hideErrors, pos}) => {
  return (
    <Toast
      visible={message ? true : false}
      position={pos}
      backgroundColor={color}
      message={message}
      allowDismiss={true}
      autoDismiss={dismissTime}
      onDismiss={() => hideErrors()}
    />
  );
};
const mapStateToProps = state => ({
  message: state.Toast.message,
  dismissTime: state.Toast.dismissAfter,
  color: state.Toast.color,
  pos: state.Toast.pos,
});

export default connect(mapStateToProps, {hideErrors})(ToastMessage);
