import axios from "../axios-setup";
import { FullTokimon } from "../models/Tokimon";

export const getAllTokis = async () => {
  try {
    const data = await axios.get("/t");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createToki = async (toki: FullTokimon) => {
  try {
    const res = await axios.post("/t", toki);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateToki = async (toki: FullTokimon) => {
  try {
    const id = toki._id;
    const res = await axios.patch(`/t/${id}`, toki);
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

export const getOneToki = async (id: string) => {
  try {
    const res = await axios.get(`/t/${id}`);
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};
