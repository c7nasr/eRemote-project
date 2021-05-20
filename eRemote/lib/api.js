import axios from 'axios';
import {check_if_key_existed} from './auth.handler';
import {getUserLocation} from './maps.handler';
import {getDeviceInfo} from './phone.info';

export const API_LINK = 'https://cc9c9c2d56ae.ngrok.io/api/';
export const apiHandler = async (type, route, payload, token) => {
  try {
    let config = {
      method: type,
      url: `${API_LINK}${route}`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: payload,
    };
    const {data, status} = await axios(config);
    if (status === 200) {
      return data;
    } else {
      return 'Not Valid';
    }
  } catch (error) {
    return 'Network Error';
  }
};

export const tryToConnect = async token => {
  try {
    let config = {
      method: 'POST',
      url: `${API_LINK}keys/connect/phone`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    };
    const {data, status} = await axios(config);
    console.log(data);
    return data;
  } catch (error) {
    return 'Network Error';
  }
};

export const getNewKey = async () => {
  try {
    let config = {
      method: 'GET',
      url: `${API_LINK}keys`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data, status} = await axios(config);
    return data;
  } catch (error) {
    return 'Network Error';
  }
};

export const getPCInfo = async () => {
  try {
    const token = await check_if_key_existed();

    if (!token) return false;
    let config = {
      method: 'GET',
      url: `${API_LINK}users/sky-info`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      payload: {},
    };
    const {data, status} = await axios(config);
    return data;
  } catch (error) {
    return 'Network Error';
  }
};

export const syncPhoneInfo = async () => {
  try {
    const pInfo = await getDeviceInfo();
    const token = await check_if_key_existed();

    if (!token) return false;
    let config = {
      method: 'POST',
      url: `${API_LINK}users/phone-info`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: {data: pInfo},
    };
    await axios(config);
    return true;
  } catch (error) {
    return false;
  }
};

export const createNewOrder = async order => {
  try {
    const token = await check_if_key_existed();

    if (!token) return false;
    let config = {
      method: 'POST',
      url: `${API_LINK}order/new`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {e_key: token, order},
    };
    const {data, status} = await axios(config);
    console.log(data);
    // To Be fast. Save the new order in redux and start function to UPDATE location of order after emitting. DON'T USE AWAIT to be SYNC
    updateLocationOrder(data.new_order._id, token);

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const updateLocationOrder = async (order_id, token) => {
  const location = await getUserLocation();

  let config = {
    method: 'POST',
    url: `${API_LINK}order/update-location`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {e_key: token, order_id, location},
  };
  axios(config);
};
export const getSecurityReports = async () => {
  try {
    const token = await check_if_key_existed();

    if (!token) return false;
    let config = {
      method: 'POST',
      url: `${API_LINK}reports/security`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {e_key: token},
    };
    const {data, status} = await axios(config);
    return data;
  } catch (error) {
    return false;
  }
};
