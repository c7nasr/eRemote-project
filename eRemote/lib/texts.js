import {convertToAgo} from './time.lib';

export const getConnectionText = (connection_state, time) => {
  if (connection_state)
    return `Your PC is online and reachable by us you can start controlling it. First connection was from ${convertToAgo(
      time,
    )}.`;

  return `Your PC is offline and NOT reachable by us you can't control it but you can view logs and send on connection commands. First connection was from ${convertToAgo(
    time,
  )}.`;
};
