import axios from "axios";

const axiosConfig = {
  baseURL: process.env.BASE_URL,
  timeout: 30_000,
}

export default axios.create(axios.axiosConfig);