import React from 'react';
import {Card} from 'react-native-ui-lib';

const titleHandler = (type, action, source) => {
  if (type == 'emergency') {
    return `Unlock Retry`;
  } else if (source && type == 'windows') {
    return `${capitalizeFirstLetter(action)} - From ${source}`;
  } else {
    return `Windows ${capitalizeFirstLetter(action)}`;
  }
};

const typeHandler = type => {
  if (type == 'emergency') {
    return `Emergency Locker`;
  } else {
    return `Windows Lock`;
  }
};

export const colorsHandler = (type, time, uuid, ip, action, source) => {
  if (type == 'windows') {
    return (
      <Card.Section
        content={[
          {text: time, text90: true, grey50: true},
          {
            text: titleHandler(type, action, source),
            text60: true,
            blue10: true,
          },
          {text: typeHandler(type), text70: true, blue20: true},
          {text: ip, text80: true, violet10: true},
          {
            text: uuid,
            text90: true,
            grey50: true,
          },
        ]}
        center
        style={{flex: 1, padding: 5}}
      />
    );
  } else {
    return (
      <Card.Section
        content={[
          {text: time, text90: true, grey50: true},
          {
            text: titleHandler(type, action, source),
            text60: true,
            purple30: true,
          },
          {text: typeHandler(type), text70: true, purple40: true},
          {text: ip, text80: true, violet10: true},
          {
            text: uuid,
            text90: true,
            grey50: true,
          },
        ]}
        center
        style={{flex: 1, padding: 5}}
      />
    );
  }
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
