import axios from "axios";
import { ResponseFormat } from "../models/Response";

export const login = async (
  email: string,
  password: string
): Promise<ResponseFormat> => {
  try {
    const res = await axios.post("/u/login", { email, password });
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err.response);
    return { ...err.response.data, statusCode: err.response.status };
  }
};
