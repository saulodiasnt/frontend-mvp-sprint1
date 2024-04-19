import { store } from "../../store";
import config from "../../config";
import axios from "axios";

export const getApi = (apiToken = null) => {
  const userToken = apiToken || store.getState()?.user?.value?.access_token;

  if (userToken) {
    return axios.create({
      baseURL: config.api_url,
      headers: {
        Authorization: `Baraer ${userToken}`,
      },
    });
  }

  return axios.create({
    baseURL: config.api_url,
  });
};
