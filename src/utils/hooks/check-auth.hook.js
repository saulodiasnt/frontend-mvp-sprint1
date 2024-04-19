import { store } from "../../store";

export const checkAuth = () => {
  const user = store.getState().user.value;
  return user !== null;
};
