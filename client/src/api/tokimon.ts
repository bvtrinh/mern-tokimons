import axios from "axios";
import { FullTokimon } from "../models/tokimon";
import { ResponseFormat } from "../models/response";

export const getAllTokis = async (): Promise<ResponseFormat> => {
  try {
    const res = await axios.get("/api/t");
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const createToki = async (toki: FullTokimon): Promise<ResponseFormat> => {
  try {
    const res = await axios.post("/api/t", toki);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const updateToki = async (toki: FullTokimon): Promise<ResponseFormat> => {
  try {
    const id = toki._id;
    const res = await axios.patch(`/api/t/${id}`, toki);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const getOneToki = async (id: string): Promise<ResponseFormat> => {
  try {
    const res = await axios.get(`/api/t/${id}`);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const deleteToki = async (id: string): Promise<ResponseFormat> => {
  try {
    const res = await axios.delete(`/api/t/${id}`);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};
