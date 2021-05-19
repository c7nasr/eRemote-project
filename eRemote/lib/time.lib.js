import moment from 'moment-timezone';
import 'intl';
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl';

export const convertToAgo = time => {
  return moment(time).fromNow();
};
export const formatTime = time => {
  return moment(time).format('DD MMMM YYYY@hh:mmA');
};

export const timestampToDate = time => {
  try {
    if (time)
      return moment(parseInt(time))
        .tz(moment.tz.guess())
        .format('DD MMMM YYYY@hh:mmA');

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
