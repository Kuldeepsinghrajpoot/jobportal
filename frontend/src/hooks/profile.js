import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

export async function postsLoader() {
  try {
    const endpoint = `${USER_API_END_POINT}/get-profile`;
    console.log("Fetching data from:", endpoint);
    const res = await axios.get(endpoint, { withCredentials: true });
    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return null;
  }
}
