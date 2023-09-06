import axios from "axios";
import { localServ } from "./localStore";
import { store } from "..";
import { batLoading, tatLoading } from "../redux/spinnerSlice";

export let https = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NCIsIkhldEhhblN0cmluZyI6IjIzLzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMzI4OTYwMDAwMCIsIm5iZiI6MTY3MjQxOTYwMCwiZXhwIjoxNzAzNDM3MjAwfQ.sBEpBy6NEqrSq0edQmAlMTJtoOz9ZG_Dam5-tGYZG5M",
    Authorization: "Bearer " + localServ.getUser()?.accessToken,
  },
});
/// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('đi');
    store.dispatch(batLoading())
    // bật loading
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    console.log('về');
    store.dispatch(tatLoading())
    // tắt loading
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(tatLoading())

    return Promise.reject(error);
  }
);
