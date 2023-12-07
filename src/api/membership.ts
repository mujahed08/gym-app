import axios from "axios";
import { host } from "./constant";

const enrollUrl = `${host}/api/v2/membership`;
const getMembershipUrl = `${host}/api/v2/membership`;
const removeMembershipUrl = `${host}/api/v2/membership`;
const putMembershipUrl = `${host}/api/v2/membership`;

export const getAccessToken = () => {
  let str: any = localStorage.getItem("user");
  let user = JSON.parse(str);
  return user.accessToken;
};

export const getUsername = () => {
  let str: any = localStorage.getItem("user");
  let user = JSON.parse(str);
  return user.username;
};

export const enroll = async (payload: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };
  let login_username:any = getUsername()
  return axios.post(enrollUrl, {...payload, login_username}, {
    headers: headers,
  });
};

export const getMembership = async (id: number) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.get(`${getMembershipUrl}?id=${id}`, {
    headers: headers,
  });
};


export const removeMembership = async (id: number) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.delete(`${removeMembershipUrl}?id=${id}`, {
    headers: headers,
  });
};

export const justStatusUpdate = async (payload: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.put(`${putMembershipUrl}?action=justStatusUpdate`, payload, {
    headers: headers,
  });
};


export const getMemberships = async (status:string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.get(`${getMembershipUrl}?status=${status}`, {
    headers: headers,
  })
};