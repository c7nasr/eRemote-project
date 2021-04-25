import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-ui-lib';

export default function CardDetails({time, title, text, type}) {
  return (
    <Card.Section
      content={[
        {text: `${title}`, text60: true, grey80: true},
        {
          text: `${text}`,
          text80: true,
          grey70: true,
        },
        {
          text: time ? `Last Request @ ${time}` : '',
          text90: true,
          grey50: true,
        },
        {
          text: `${type ? `${type}` : ''}`,
          text90: true,
          grey50: true,
        },
      ]}
      style={{padding: 20, flex: 1}}
    />
  );
}
