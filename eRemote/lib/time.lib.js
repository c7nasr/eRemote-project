import moment from 'moment';

export const convertToAgo = time => {
  return moment(time).fromNow();
};
export const formatTime = time => {
  return moment(time).format('DD MMMM YYYY@hh:mmA');
};
