import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const sendApi = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
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
