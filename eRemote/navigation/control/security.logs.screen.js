import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {View, Colors, Text} from 'react-native-ui-lib';
import SecurityLogsList from '../../components/control/logs/security.logs.list';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const SecurityLogs = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark10}}>
      <View
        style={{
          padding: 10,
          paddingTop: 30,
        }}>
        <View row style={{justifyContent: 'space-between'}}>
          <Text text50 style={{color: 'white', marginBottom: 15}}>
            Security Reports
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.grey10,
              borderRadius: 50,
              margin: 5,
            }}>
            <Icon name="sort" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: 50}}>
          <SecurityLogsList
            type="windows"
            action="lock"
            source={'Website'}
            time="4/22/2021 10:43:26 PM"
            uuid="86eee7e8-8611-4c76-bc87-a5839d18f478"
            ip={'42.42.42.422/192.168.1.1'}
          />
          <SecurityLogsList
            type="emergency"
            time="4/22/2021 10:43:26 PM"
            uuid="86eee7e8-8611-4c76-bc87-a5839d18f478"
            ip={'42.42.42.422/192.168.1.1'}
            password={'dlfbnodefbnv'}
            image={'https://i.vgy.me/85Ve41.jpg'}
          />
          <SecurityLogsList
            type="windows"
            action="unlock"
            time="4/22/2021 10:43:26 PM"
            uuid="86eee7e8-8611-4c76-bc87-a5839d18f478"
            ip={'42.42.42.422/192.168.1.1'}
          />
          <SecurityLogsList
            type="emergency"
            time="4/22/2021 10:43:26 PM"
            uuid="86eee7e8-8611-4c76-bc87-a5839d18f478"
            ip={'42.42.42.422/192.168.1.1'}
            password={'dlfbnodefbnv'}
          />
          <SecurityLogsList
            type="emergency"
            time="4/22/2021 10:43:26 PM"
            ip={'42.42.42.422/192.168.1.1'}
            password={'dlfbnodefbnv'}
            uuid="86eee7e8-8611-4c76-bc87-a5839d18f478"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SecurityLogs;
