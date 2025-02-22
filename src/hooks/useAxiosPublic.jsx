import React from "react";
import axios from './../../node_modules/axios/lib/axios';

export default function useAxiosPublic() {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:9000/",
  });
  return axiosPublic;
}
