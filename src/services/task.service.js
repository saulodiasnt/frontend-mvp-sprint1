import axios from "axios";

import config from "../config";
import { store } from "../store";

export const createTask = async (createBody) => {
  const userToken = store.getState().user.value.access_token;
  await axios.post(`${config.api_url}/tasks`, createBody, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};

export const updateTask = async (updateBody) => {
  const userToken = store.getState().user.value.access_token;
  const { id, user_id: _, ...body } = updateBody || {};

  await axios.put(`${config.api_url}/tasks/${id}`, body, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};

export const deleteTask = async (task_id) => {
  const userToken = store.getState().user.value.access_token;
  return axios.delete(`${config.api_url}/tasks/${task_id}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};
