import axios from "../axios-setup";
import { FullTokimon } from "../models/Tokimon";
import { ResponseFormat } from "../models/Response";

export const getAllTokis = async (): Promise<ResponseFormat> => {
  try {
    const res = await await axios.get("/t");
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err);
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const createToki = async (
  toki: FullTokimon
): Promise<ResponseFormat> => {
  try {
    const res = await axios.post("/t", toki);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err);
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const updateToki = async (
  toki: FullTokimon
): Promise<ResponseFormat> => {
  try {
    const id = toki._id;
    const res = await axios.patch(`/t/${id}`, toki);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const getOneToki = async (id: string): Promise<ResponseFormat> => {
  try {
    const res = await axios.get(`/t/${id}`);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err.response);
    return { ...err.response.data, statusCode: err.response.status };
  }
};
