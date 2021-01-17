import axios from "axios";
import { ResponseFormat } from "../models/response";
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
    setAuth(res.data.expiryTime, firstName);

    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const logout = async (): Promise<ResponseFormat> => {
  try {
    const res = await axios.get("/u/logout");
    clearAuth();
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    return { ...err.response.data, statusCode: err.response.status };
  }
};

export const refreshTokens = async (): Promise<ResponseFormat> => {
  try {
    const res = await axios.get("/u/refresh");
    setAuth(res.data.expiryTime, res.data.firstName);
    return { ...res.data, statusCode: res.status };
  } catch (err) {
    if (err.message === "Network Error") {
      return {
        payload: "",
        message: err.message,
        error: true,
        statusCode: 503,
      };
    }
    return { ...err.response.data, statusCode: err.response.status };
  }
};
