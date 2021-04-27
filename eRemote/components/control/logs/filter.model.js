import React from 'react';
import {Touchable, TouchableOpacity, View} from 'react-native';
import {
  Dialog,
  RadioButton,
  Text,
  RadioGroup,
  Colors,
  DateTimePicker,
} from 'react-native-ui-lib';
import {filterHandler} from '../../../lib/security.logs.handler';

export default function FilterModel({isOpen, toggle}) {
  const [reportType, setReportType] = React.useState(3);
  const [reportFrom, setReportFrom] = React.useState(); // Here From INstalled date
  const [reportTo, setReportTo] = React.useState(new Date());
  return (
    <View>
      <Dialog
        migrate
        useSafeArea
        visible={isOpen}
        onDismiss={() => {
          toggle(false);
        }}
        center
        containerStyle={{backgroundColor: 'white', borderRadius: 5}}
        ignoreBackgroundPress={false}>
        <View style={{padding: 10}}>
          <RadioGroup
            style={{padding: 3}}
            initialValue={reportType}
            onValueChange={e => setReportType(e)}>
            <RadioButton
              color={Colors.blue20}
              style={{margin: 5}}
              label="Windows Lock"
              value={1}
            />
            <RadioButton
              color={Colors.purple40}
              style={{margin: 5}}
              label="Emergency Lock"
              value={2}
            />
            <RadioButton style={{margin: 5}} label="Both" value={3} />
          </RadioGroup>
          <View style={{padding: 15}}>
            <DateTimePicker
              containerStyle={{marginVertical: 3}}
              title={'Start Date'}
              placeholder={'Start Date'}
              value={reportFrom}
              onChange={e => setReportFrom(e)}
              dateFormat={'MMM D, YYYY'}
              // Date Value will be from date installed PC Client
            />

            <DateTimePicker
              title={'to'}
              placeholder={'to Date'}
              value={reportTo}
              onChange={e => setReportTo(e)}
              dateFormat={'MMM D, YYYY'}
            />

            <TouchableOpacity
              style={{
                backgroundColor: '#114e60',
                padding: 7,
                borderRadius: 7,
              }}>
              <Text
                center
                grey70
                text60L
                onPress={() =>
                  filterHandler(reportFrom, reportTo, reportType, toggle)
                }>
                Filter Reports
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </View>
  );
}
