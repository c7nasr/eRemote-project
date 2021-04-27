import React from 'react';
import {ScrollView, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {Colors, ExpandableSection, ListItem, Text} from 'react-native-ui-lib';

const SecurityLogsList = ({
  type,
  time,
  uuid,
  lock_location,
  ip,
  password,
  image,
}) => {
  const [openCard, setOpenCard] = React.useState(false);
  return (
    <>
      <View row center margin-20>
        <Text dark70 text70 marginR-10 onPress={() => setOpenCard(!openCard)}>
          Open section on top
        </Text>
      </View>
      <ExpandableSection expanded={openCard}>
        <Text>Card Here</Text>
      </ExpandableSection>
    </>
  );
};

export default SecurityLogsList;
