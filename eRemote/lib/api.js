import axios from 'axios';

const API_LINK = 'https://73ce4872f138.ngrok.io/api/';
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
      return false;
    }
  } catch (error) {
    return false;
  }
};
