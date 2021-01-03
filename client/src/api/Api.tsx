import axios from "../axios-setup";

export const getAllTokis = async () => {
  try {
    const data = await axios.get("/t");
    return data;
  } catch (err) {
    console.log(err);
  }
};
