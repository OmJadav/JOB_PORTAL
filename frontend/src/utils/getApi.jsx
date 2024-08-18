import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const getApi = async (url) => {
  try {
    const response = await axios.get(url, { withCredentials: true });
    if (response?.data) {
      toast.success(response?.data?.message);
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message);
    console.log(err);
    return err.response?.data?.message;
  }
};