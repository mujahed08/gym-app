import axios from "axios";
import { host } from "./constant";

const loginUrl = `${host}/api/v2/auth/signin`;

export const login = async (payload: any) => {
  return axios.post(loginUrl, payload);
};
