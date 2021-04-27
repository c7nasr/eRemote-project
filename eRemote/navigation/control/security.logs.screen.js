import React from 'react';
import {View, Colors, Text} from 'react-native-ui-lib';
import SecurityLogsList from '../../components/control/logs/security.logs.list';

const SecurityLogs = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark10}}>
      <View
        style={{
          padding: 10,
          paddingTop: 25,
        }}>
        <Text text50 style={{color: 'white'}}>
          Security Logs
        </Text>
        <SecurityLogsList />
        <SecurityLogsList />
        <SecurityLogsList />
        <SecurityLogsList />
        <SecurityLogsList />
      </View>
    </View>
  );
};

export default SecurityLogs;
