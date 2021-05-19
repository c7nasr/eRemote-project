import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {View, Colors, Text} from 'react-native-ui-lib';
import SecurityLogsList from '../../components/control/logs/security.logs.list';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FilterModel from '../../components/control/logs/filter.model';
import {getSecurityReports} from '../../lib/api';
import {updateSecurity} from '../../redux/actions/Reports.Action';
import {connect} from 'react-redux';
import {timestampToDate} from '../../lib/time.lib';
import {showNewError} from '../../redux/actions/Toast.Action';

const SecurityLogs = ({updateSecurity, reports, showNewError}) => {
  const [sortModel, setSortModel] = React.useState(false);
  const [refreshCommand, setRefreshCommand] = React.useState(false);

  React.useEffect(async () => {
    showNewError('Refreshing Reports....', '', 1000);
    const getRemoteReports = await getSecurityReports();
    updateSecurity(getRemoteReports.reports);
    showNewError('Reports Updated', Colors.green20, 1000);
  }, [refreshCommand]);
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
            onPress={() => setSortModel(true)}
            style={{
              backgroundColor: Colors.grey10,
              borderRadius: 50,
              margin: 5,
            }}>
            <Icon name="sort" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <FilterModel isOpen={sortModel} toggle={setSortModel} />
        <ScrollView
          style={{marginBottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setRefreshCommand(!refreshCommand);
              }}
            />
          }>
          {reports.security.length > 0 &&
            reports?.security[0].map(report => (
              <SecurityLogsList
                key={report.ID}
                type="windows"
                action={report.type === 1 ? 'lock' : 'unlock'}
                source={report.sources}
                time={timestampToDate(report.timestamp)}
                uuid={report.ID}
                ip={`${report.ip}/${report.local_ip}`}
                location={report.location}
              />
            ))}

          {/* <SecurityLogsList
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
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  reports: state.Reports,
});

export default connect(mapStateToProps, {updateSecurity, showNewError})(
  SecurityLogs,
);
