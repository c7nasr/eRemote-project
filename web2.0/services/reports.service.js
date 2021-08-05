import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000/api/reports/";

const screenshotHistoryRequest = async (token) => {
  try {
    return await (
      await axios.post(
        API_URL + "screenshots",
        {},
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      )
    ).data;
  } catch (error) {
    toast.error("Your session expired. Refresh the Page");
  }
};

const securityHistoryRequest = async (token) => {
  try {
    return await (
      await axios.post(
        API_URL + "security",
        {},
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      )
    ).data;
  } catch (error) {
    toast.error("Your session expired. Refresh the Page");
  }
};

export default {
  screenshotHistoryRequest,
  securityHistoryRequest,
};
