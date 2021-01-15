import axios from "axios";
import { ResponseFormat } from "../models/Response";
import { setAuth, clearAuth } from "../utils/auth";

export const login = async (
  email: string,
  password: string
): Promise<ResponseFormat> => {
  try {
    const res = await axios.post("/u/login", { email, password });
    const { expiryTime, firstName } = res.data;

    setAuth(expiryTime, firstName);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err.response);
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<ResponseFormat> => {
  try {
    const res = await axios.post("/u/signup", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err.response);
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const logout = async (): Promise<ResponseFormat> => {
  try {
    const res = await axios.get("/u/logout");
    clearAuth();
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    console.log(err.response);
    return { ...err.response.data, statusCode: err.response.status };
  }
};
