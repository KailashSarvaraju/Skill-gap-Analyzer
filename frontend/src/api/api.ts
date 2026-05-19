import axios from "axios";

const API = axios.create({
  baseURL: "https://skill-gap-analyzer-i1ep.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;